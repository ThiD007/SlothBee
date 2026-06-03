import { useEffect, useMemo, useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { getFavoriteBlogIds, toggleFavoriteBlog } from "../services/blogFavorites.js"
import { getBlogPosts } from "../services/blogPosts.js"
import BlogConteudo from "./BlogConteudo.jsx"
import { AppFrame, Icon, Logo } from "./shared.jsx"

function formatDate(value) {
  if (!value) return ""

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value))
}

function getReadingTime(post) {
  const text = [post.title, post.summary, ...(post.content || [])].join(" ")
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

function CategoryPill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 rounded-full px-4 text-[12px] font-black transition-colors ${
        active
          ? "bg-[#5d8f44] text-white shadow-sm"
          : "bg-white text-[#6f5b2e] shadow-sm hover:bg-[#edf4d8]"
      }`}
    >
      {children}
    </button>
  )
}

function FavoriteButton({ isFavorite, onClick, title, large = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex shrink-0 items-center justify-center rounded-full shadow-sm transition-colors ${
        large ? "h-11 w-11" : "h-9 w-9"
      } ${isFavorite ? "bg-[#ffd44a] text-[#8a551f]" : "bg-white text-[#a36922] hover:bg-[#fbe7c6]"}`}
      aria-label={isFavorite ? `Remover ${title} dos favoritos` : `Favoritar ${title}`}
      aria-pressed={isFavorite}
    >
      <Icon className={large ? "h-5 w-5" : "h-4 w-4"} name="star" />
    </button>
  )
}

function FeaturedPost({ post, isFavorite, onRead, onToggleFavorite }) {
  if (!post) return null

  return (
    <article className="overflow-hidden rounded-lg bg-[#fff8dd] shadow-sm xl:grid xl:grid-cols-[minmax(0,1fr)_340px]">
      <button
        type="button"
        onClick={() => onRead(post)}
        className={`block min-h-[260px] w-full overflow-hidden bg-white text-left ${post.imageBg}`}
        aria-label={`Ler ${post.title}`}
      >
        <img src={post.image} alt="" className="h-full min-h-[260px] w-full object-cover" />
      </button>

      <div className="grid content-between gap-5 p-5 sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase text-[#5d8f44] shadow-sm">
              {post.category}
            </span>
            <FavoriteButton
              large
              title={post.title}
              isFavorite={isFavorite}
              onClick={() => onToggleFavorite(post.id)}
            />
          </div>

          <h2 className="mt-5 text-3xl font-black leading-tight text-[#263d2a] sm:text-4xl">{post.title}</h2>
          <p className="mt-4 text-sm font-bold leading-relaxed text-[#6c5f48]">{post.summary}</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[12px] font-black text-[#8a551f]">
            {formatDate(post.createdAt) || "SlothBee"} - {getReadingTime(post)} min
          </span>
          <button
            type="button"
            onClick={() => onRead(post)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#5d8f44] px-5 text-[12px] font-black text-white shadow-sm hover:bg-[#4f8236]"
          >
            Ler agora
            <Icon className="h-4 w-4" name="arrowRight" />
          </button>
        </div>
      </div>
    </article>
  )
}

function BlogCard({ post, isFavorite, onRead, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-lg bg-white shadow-sm transition-transform hover:-translate-y-0.5">
      <button
        type="button"
        onClick={() => onRead(post)}
        className={`block aspect-[4/3] w-full overflow-hidden ${post.imageBg}`}
        aria-label={`Ler ${post.title}`}
      >
        <img src={post.image} alt="" className="h-full w-full object-cover" />
      </button>

      <div className="grid min-h-[210px] content-between gap-4 p-4">
        <div>
          <div className="flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full bg-[#edf4d8] px-3 py-1 text-[10px] font-black uppercase text-[#4f8236]">
              {post.category}
            </span>
            <FavoriteButton title={post.title} isFavorite={isFavorite} onClick={() => onToggleFavorite(post.id)} />
          </div>

          <h2 className="mt-3 text-lg font-black leading-tight text-[#263d2a]">{post.title}</h2>
          <p className="mt-2 line-clamp-3 text-[13px] font-bold leading-relaxed text-[#6c6b5f]">{post.summary}</p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#efe3cf] pt-3">
          <span className="text-[11px] font-black text-[#9a5a1e]">{getReadingTime(post)} min</span>
          <button
            type="button"
            onClick={() => onRead(post)}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-full bg-[#fbe7c6] px-3 text-[11px] font-black text-[#8a551f]"
          >
            Ler
            <Icon className="h-3.5 w-3.5" name="arrowRight" />
          </button>
        </div>
      </div>
    </article>
  )
}

function BlogList({ currentUser, favoritesOnly = false, onRead }) {
  const [blogPosts, setBlogPosts] = useState([])
  const [favoriteIds, setFavoriteIds] = useState([])
  const [blogMessage, setBlogMessage] = useState("Carregando blogs...")
  const [isLoading, setIsLoading] = useState(true)
  const [isProfessionalOpen, setIsProfessionalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Todos")
  const professional = {
    name: "Dra. Mariana Alves",
    role: "Psicologa clinica",
    phone: "(11) 99876-5432",
    image: mascoteAlmofadaImg,
  }

  useEffect(() => {
    let ignore = false

    async function loadPosts() {
      try {
        setIsLoading(true)
        const [posts, favorites] = await Promise.all([getBlogPosts(), getFavoriteBlogIds()])
        if (!ignore) {
          setBlogPosts(posts)
          setFavoriteIds(favorites)
          setBlogMessage(posts.length ? "" : "Nenhum blog cadastrado ainda.")
        }
      } catch (error) {
        if (!ignore) setBlogMessage(error.message)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadPosts()

    return () => {
      ignore = true
    }
  }, [currentUser])

  const categories = useMemo(() => {
    const uniqueCategories = blogPosts.map((post) => post.category).filter(Boolean)
    return ["Todos", ...Array.from(new Set(uniqueCategories))]
  }, [blogPosts])

  const visiblePosts = useMemo(() => {
    const posts = favoritesOnly
      ? blogPosts.filter((post) => favoriteIds.includes(String(post.id)))
      : blogPosts

    if (activeCategory === "Todos") return posts
    return posts.filter((post) => post.category === activeCategory)
  }, [activeCategory, blogPosts, favoriteIds, favoritesOnly])

  const featuredPost = favoritesOnly ? null : visiblePosts[0]
  const secondaryPosts = featuredPost ? visiblePosts.slice(1) : visiblePosts

  async function handleToggleFavorite(blogId) {
    try {
      setFavoriteIds(await toggleFavoriteBlog(blogId))
    } catch (error) {
      setBlogMessage(error.message)
    }
  }

  const emptyMessage = isLoading
    ? blogMessage
    : favoritesOnly
      ? "Nenhum blog favoritado ainda."
      : activeCategory === "Todos"
        ? blogMessage
        : "Nenhum blog nesta categoria."
  const pageDescription = favoritesOnly
    ? "Seus blogs preferidos ficam reunidos aqui para achar rapidinho."
    : "Dicas e conteudos para uma vida mais leve, saudavel e equilibrada."

  return (
    <section className="min-h-[calc(100vh-1rem)] rounded-lg bg-[#fffdf5] p-4 shadow-sm sm:p-6 lg:col-span-2">
      <div className={`grid gap-5 ${favoritesOnly ? "" : "xl:grid-cols-[minmax(0,1fr)_300px]"}`}>
        <div className="min-w-0">
          <header className="relative mb-5 overflow-hidden rounded-lg bg-white p-5 shadow-sm">
            <div className="relative z-10 flex items-center gap-4">
              <img src={favoritesOnly ? abelhaImg : mascoteAlmofadaImg} alt="" className="hidden h-24 w-24 object-contain sm:block" />
              <div className="min-w-0">
                <Logo />
                <h1 className="mt-2 text-3xl font-black leading-tight text-[#263d2a] sm:text-4xl">
                  {favoritesOnly ? (
                    <>
                      Favoritos <span className="text-[#f2b52f]">SlothBee</span>
                    </>
                  ) : (
                    <>
                      Blog do <span className="text-[#5f8f34]">Sloth</span>
                      <span className="text-[#f2b52f]">Bee</span>
                    </>
                  )}
                </h1>
                <p className="mt-2 max-w-[560px] text-sm font-bold leading-relaxed text-[#6c6b5f]">{pageDescription}</p>
              </div>
            </div>
            <img src={plantinhaImg} alt="" className="absolute -bottom-10 -right-6 h-36 w-36 object-contain opacity-80" />
          </header>

          {categories.length > 2 && (
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <CategoryPill
                  key={category}
                  active={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </CategoryPill>
              ))}
            </div>
          )}

          <div className="grid gap-4">
            {featuredPost && (
              <FeaturedPost
                post={featuredPost}
                isFavorite={favoriteIds.includes(String(featuredPost.id))}
                onRead={onRead}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {secondaryPosts.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {secondaryPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    isFavorite={favoriteIds.includes(String(post.id))}
                    onRead={onRead}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </div>
            )}

            {(isLoading || visiblePosts.length === 0) && (
              <p className="rounded-lg bg-white p-5 text-sm font-black text-[#6c6b5f] shadow-sm">{emptyMessage}</p>
            )}
          </div>
        </div>

        {!favoritesOnly && (
          <aside className="grid content-start gap-4">
            <section className="overflow-hidden rounded-lg bg-white shadow-sm">
              <div className="bg-[#fff8dd] px-5 py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ffd44a] text-[#8a551f] shadow-sm">
                  <Icon className="h-8 w-8" name="chat" />
                </div>
                <h2 className="mt-4 text-2xl font-black text-[#263d2a]">Precisa de ajuda?</h2>
                <p className="mx-auto mt-3 max-w-[220px] text-sm font-bold leading-snug text-[#6c6b5f]">
                  Conversar com um profissional pode fazer toda a diferenca.
                </p>
                <button
                  type="button"
                  onClick={() => setIsProfessionalOpen(true)}
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#5d8f44] px-5 text-[12px] font-black text-white shadow-sm"
                >
                  <Icon className="h-4 w-4" name="chat" />
                  Falar com profissional
                </button>
              </div>
              <img src={plantinhaImg} alt="" className="mx-auto -mt-2 h-40 w-48 object-contain" />
            </section>

            <section className="rounded-lg bg-white p-4 shadow-sm">
              <div className="grid grid-cols-[64px_1fr] items-center gap-3">
                <img src={mascoteImg} alt="" className="h-16 w-16 object-contain" />
                <div>
                  <h2 className="text-sm font-black text-[#5d8f44]">Pequenas escolhas, grandes mudancas</h2>
                  <p className="mt-1 text-[12px] font-bold leading-snug text-[#6c6b5f]">
                    Cuide de voce, uma dica de cada vez.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        )}
      </div>

      {!favoritesOnly && isProfessionalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
          <div className="relative w-full max-w-[360px] rounded-lg bg-white p-6 text-center shadow-xl">
            <button
              type="button"
              onClick={() => setIsProfessionalOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#f7f3e8] text-[#263d2a]"
              aria-label="Fechar contato do profissional"
            >
              <Icon className="h-5 w-5" name="close" />
            </button>

            <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#f3f7df]">
              <img src={professional.image} alt={professional.name} className="h-24 w-24 object-contain" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-[#263d2a]">{professional.name}</h2>
            <p className="mt-1 text-sm font-bold text-[#5d8f44]">{professional.role}</p>
            <p className="mt-4 text-lg font-black text-[#9a5a1e]">{professional.phone}</p>
          </div>
        </div>
      )}
    </section>
  )
}

function Blog({ activePage, currentUser, favoritesOnly = false, onNavigate, theme, onToggleTheme }) {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      {selectedPost ? (
        <BlogConteudo post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <BlogList currentUser={currentUser} favoritesOnly={favoritesOnly} onRead={setSelectedPost} />
      )}
    </AppFrame>
  )
}

export default Blog
