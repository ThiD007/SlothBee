import { useEffect, useMemo, useRef, useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { addBlogPostWithImage, deleteBlogPost, getBlogPosts, updateBlogPostWithImage } from "../services/blogPosts.js"
import { AdminFrame, Icon, Logo } from "./shared.jsx"

function AdminPostCard({ post, onDelete, onEdit }) {
  return (
    <article className="grid gap-3 rounded-lg bg-white p-3 shadow-sm sm:grid-cols-[96px_1fr_auto] sm:items-center">
      <div className={`flex h-24 items-center justify-center rounded-sm ${post.imageBg}`}>
        <img src={post.image} alt="" className="h-20 w-20 object-contain" />
      </div>

      <div>
        <span className="inline-flex rounded-sm bg-[#dff0c8] px-2 py-1 text-[10px] font-black uppercase text-[#4f8236]">
          {post.category}
        </span>
        <h2 className="mt-2 text-base font-black text-[#263d2a]">{post.title}</h2>
        <p className="mt-1 text-[12px] font-bold leading-snug text-[#6c6b5f]">{post.summary}</p>
      </div>

      <div className="flex gap-2 sm:grid">
        <button
          type="button"
          onClick={() => onEdit(post)}
          className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#fbe7c6] text-[#8a551f]"
          aria-label={`Editar ${post.title}`}
        >
          <Icon className="h-4 w-4" name="edit" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(post.id)}
          className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#8d5a27] text-white"
          aria-label={`Deletar ${post.title}`}
        >
          <Icon className="h-4 w-4" name="trash" />
        </button>
      </div>
    </article>
  )
}

function AdminBlog({ activePage, onNavigate, theme, onToggleTheme }) {
  const [posts, setPosts] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    summary: "",
  })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [editingPost, setEditingPost] = useState(null)
  const [removeCurrentImage, setRemoveCurrentImage] = useState(false)
  const fileInputRef = useRef(null)

  const imagePreview = useMemo(() => {
    if (!imageFile) return ""
    return URL.createObjectURL(imageFile)
  }, [imageFile])

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  async function loadPosts() {
    try {
      setIsLoading(true)
      setPosts(await getBlogPosts())
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  function handleFieldChange(event) {
    const { name, value } = event.target
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setRemoveCurrentImage(false)
    setMessage("")
  }

  function handleRemoveImage() {
    setImageFile(null)
    setRemoveCurrentImage(Boolean(editingPost?.fotoUrl))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function resetForm() {
    setFormData({ title: "", category: "", summary: "" })
    setEditingPost(null)
    setImageFile(null)
    setRemoveCurrentImage(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function handleEditPost(post) {
    setEditingPost(post)
    setFormData({
      title: post.title || "",
      category: post.category || "",
      summary: post.summary || "",
    })
    setImageFile(null)
    setRemoveCurrentImage(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
    setMessage("Editando blog selecionado.")
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const title = formData.title.trim()
    const category = formData.category.trim()
    const summary = formData.summary.trim()

    if (!title || !category || !summary) {
      setMessage("Preencha titulo, categoria e resumo.")
      return
    }

    try {
      setIsSaving(true)
      if (editingPost) {
        await updateBlogPostWithImage({
          id: editingPost.id,
          title,
          category,
          summary,
          imageFile,
          keepCurrentImage: !removeCurrentImage,
        })
      } else {
        await addBlogPostWithImage({ title, category, summary, imageFile })
      }
      await loadPosts()
      resetForm()
      setMessage(editingPost ? "Blog atualizado com sucesso." : "Blog adicionado com sucesso.")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeletePost(id) {
    try {
      await deleteBlogPost(id)
      await loadPosts()
      setMessage("Blog removido.")
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid content-start gap-3">
          <header className="rounded-lg bg-[#fffdf5] p-5 shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <img src={abelhaImg} alt="" className="h-16 w-16 object-cover" />
              <div className="min-w-0">
                <Logo />
                <h1 className="mt-2 text-3xl font-black text-[#263d2a]">
                  Blog do <span className="text-[#5f8f34]">Sloth</span>
                  <span className="text-[#f2b52f]">Bee</span>
                </h1>
                <p className="mt-1 text-sm font-bold text-[#6c6b5f]">
                  O adm adiciona novos posts e deleta conteudos antigos.
                </p>
              </div>
            </div>
          </header>

          <section className="grid gap-3">
            {isLoading ? (
              <p className="rounded-lg bg-white p-4 text-[12px] font-black text-[#6c6b5f] shadow-sm">Carregando blogs...</p>
            ) : posts.length ? (
              posts.map((post) => (
                <AdminPostCard key={post.id} post={post} onDelete={handleDeletePost} onEdit={handleEditPost} />
              ))
            ) : (
              <p className="rounded-lg bg-white p-4 text-[12px] font-black text-[#6c6b5f] shadow-sm">
                Nenhum blog cadastrado ainda.
              </p>
            )}
          </section>
        </div>

        <aside className="grid content-start gap-3">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#87521f]">
              <Icon className="h-6 w-6 text-[#a36922]" name={editingPost ? "edit" : "plus"} />
              {editingPost ? "Editar blog" : "Novo blog"}
            </div>

            <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Titulo
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleFieldChange}
                  placeholder="Pausas que ajudam o foco"
                  maxLength={150}
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Categoria
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleFieldChange}
                  placeholder="Saude mental"
                  maxLength={80}
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Resumo
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleFieldChange}
                  placeholder="Escreva a chamada curta do blog."
                  className="mt-1 min-h-24 w-full resize-none rounded-sm bg-[#f7f3e8] px-3 py-2 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <section className="rounded-sm bg-[#f7f3e8] p-3">
                <p className="text-[12px] font-black text-[#8c9b3b]">Imagem do blog</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-white">
                    <img
                      src={imagePreview || (!removeCurrentImage && editingPost?.fotoUrl) || plantinhaImg}
                      alt="Previa do blog"
                      className={`h-full w-full ${
                        imagePreview || (!removeCurrentImage && editingPost?.fotoUrl)
                          ? "object-cover"
                          : "object-contain p-2 opacity-80"
                      }`}
                    />
                  </div>
                  <div className="grid flex-1 gap-2">
                    <input
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      type="file"
                    />
                    <button
                      className="h-9 rounded-sm bg-white text-[12px] font-black text-[#8a551f]"
                      onClick={() => fileInputRef.current?.click()}
                      type="button"
                    >
                      {imageFile || editingPost?.fotoUrl ? "Trocar imagem" : "Adicionar imagem"}
                    </button>
                    <button
                      className="h-9 rounded-sm bg-[#fbe7c6] text-[12px] font-black text-[#8a551f] disabled:opacity-60"
                      disabled={!imageFile && (!editingPost?.fotoUrl || removeCurrentImage)}
                      onClick={handleRemoveImage}
                      type="button"
                    >
                      Remover imagem
                    </button>
                  </div>
                </div>
              </section>
              {message && <p className="text-[12px] font-black text-[#5d8f44]">{message}</p>}
              <button
                type="submit"
                disabled={isSaving}
                className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
              >
                {isSaving ? "Salvando..." : editingPost ? "Salvar blog" : "Adicionar blog"}
                <Icon className="h-4 w-4" name={editingPost ? "edit" : "plus"} />
              </button>
              {editingPost && (
                <button
                  className="h-10 rounded-sm bg-[#fbe7c6] text-[12px] font-black text-[#8a551f]"
                  onClick={() => {
                    resetForm()
                    setMessage("")
                  }}
                  type="button"
                >
                  Cancelar edicao
                </button>
              )}
            </form>
          </section>

          <section className="rounded-lg bg-[#fbe7c6] p-5 text-center shadow-sm">
            <img src={plantinhaImg} alt="" className="mx-auto h-32 w-36 object-cover" />
            <h2 className="text-base font-black text-[#8a551f]">Conteudo visual</h2>
            <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
              Os novos blogs ficam salvos na tabela blogs do banco de dados.
            </p>
          </section>
        </aside>
      </section>
    </AdminFrame>
  )
}

export default AdminBlog
