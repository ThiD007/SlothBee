import plantinhaImg from "../public/slothBeePlantinha.png"
import { API_URL, createApiError } from "./auth.js"

function normalizePost(post) {
  const summary = post.summary || post.resumo || ""

  return {
    id: post.id,
    title: post.title || post.titulo || "",
    category: post.category || post.categoria || "",
    summary,
    image: post.fotoUrl || post.foto_url || plantinhaImg,
    imageBg: post.fotoUrl || post.foto_url ? "bg-white" : "bg-[#dff4f7]",
    content: Array.isArray(post.content) && post.content.length ? post.content : [summary],
    tips:
      Array.isArray(post.tips) && post.tips.length
        ? post.tips
        : ["Leia com calma.", "Escolha uma acao pequena para hoje.", "Volte quando precisar revisar a dica."],
    createdAt: post.createdAt || post.criado_em || null,
  }
}

async function request(path, options = {}) {
  const accessToken = localStorage.getItem("accessToken")
  const { headers, ...fetchOptions } = options

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw createApiError(response, data, "Erro ao conectar com o servidor")
  }

  return data
}

export async function getBlogPosts() {
  const data = await request("/blogs")
  return (data.blogs || []).map(normalizePost)
}

export async function addBlogPost({ title, category, summary, fotoUrl }) {
  const data = await request("/admin/blogs", {
    method: "POST",
    body: JSON.stringify({
      titulo: title,
      categoria: category,
      resumo: summary,
      foto_url: fotoUrl || null,
    }),
  })

  return normalizePost(data.blog)
}

export async function addBlogPostWithImage({ title, category, summary, imageFile }) {
  const accessToken = localStorage.getItem("accessToken")
  const formData = new FormData()
  formData.append("titulo", title)
  formData.append("categoria", category)
  formData.append("resumo", summary)
  if (imageFile) formData.append("foto_blog", imageFile)

  const response = await fetch(`${API_URL}/admin/blogs`, {
    method: "POST",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw createApiError(response, data, "Erro ao conectar com o servidor")
  }

  return normalizePost(data.blog)
}

export async function updateBlogPostWithImage({ id, title, category, summary, imageFile, keepCurrentImage = true }) {
  const accessToken = localStorage.getItem("accessToken")
  const formData = new FormData()
  formData.append("titulo", title)
  formData.append("categoria", category)
  formData.append("resumo", summary)
  formData.append("keepCurrentImage", keepCurrentImage ? "true" : "false")
  if (imageFile) formData.append("foto_blog", imageFile)

  const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
    method: "PUT",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw createApiError(response, data, "Erro ao conectar com o servidor")
  }

  return normalizePost(data.blog)
}

export function deleteBlogPost(id) {
  return request(`/admin/blogs/${id}`, { method: "DELETE" })
}
