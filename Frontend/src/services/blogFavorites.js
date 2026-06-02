import { API_URL, createApiError } from "./auth.js"

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

export async function getFavoriteBlogIds() {
  const data = await request("/blogs/favorites")
  return (data.favoriteIds || []).map(String)
}

export async function toggleFavoriteBlog(blogId) {
  const data = await request(`/blogs/${blogId}/favorite`, { method: "POST" })
  return (data.favoriteIds || []).map(String)
}
