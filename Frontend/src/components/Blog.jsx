import { useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { getBlogPosts } from "../services/blogPosts.js"
import BlogConteudo from "./BlogConteudo.jsx"
import { AppFrame, Icon, Logo } from "./shared.jsx"

function BlogCard({ post, onRead }) {
  return (
    <article className="grid gap-4 rounded-sm bg-white p-3 shadow-sm sm:grid-cols-[120px_1fr_auto] sm:items-center">
      <div className={`flex h-28 items-center justify-center rounded-sm ${post.imageBg}`}>
        <img src={post.image} alt="" className="h-24 w-24 object-contain" />
      </div>

      <div>
        <span className="inline-flex rounded-sm bg-[#dff0c8] px-2 py-1 text-[10px] font-black uppercase text-[#4f8236]">
          {post.category}
        </span>
        <h2 className="mt-2 text-base font-black text-[#263d2a]">{post.title}</h2>
        <p className="mt-1 text-[12px] font-bold leading-snug text-[#6c6b5f]">{post.summary}</p>
      </div>

      <button
        type="button"
        onClick={() => onRead(post)}
        className="inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-[#5d8f44] px-4 text-[12px] font-black text-white"
      >
        Ler mais
        <Icon className="h-4 w-4" name="arrowRight" />
      </button>
    </article>
  )
}

function BlogList({ onRead }) {
  const [blogPosts] = useState(getBlogPosts)
  const [isProfessionalOpen, setIsProfessionalOpen] = useState(false)
  const professional = {
    name: "Dra. Mariana Alves",
    role: "Psicologa clinica",
    phone: "(11) 99876-5432",
    image: mascoteAlmofadaImg,
  }

  return (
    <section className="min-h-[calc(100vh-1rem)] rounded-sm bg-[#fffdf5] p-5 shadow-sm lg:col-span-2">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <header className="mb-5 flex items-center gap-4">
            <img src={mascoteAlmofadaImg} alt="" className="hidden h-24 w-24 object-contain sm:block" />
            <div className="min-w-0">
              <Logo />
              <h1 className="mt-2 text-3xl font-black text-[#263d2a]">
                Blog do <span className="text-[#5f8f34]">Sloth</span>
                <span className="text-[#f2b52f]">Bee</span>
              </h1>
              <p className="mt-1 text-sm font-bold text-[#6c6b5f]">
                Dicas e conteudos para uma vida mais leve, saudavel e equilibrada.
              </p>
            </div>
            <img src={abelhaImg} alt="" className="ml-auto h-16 w-16 object-contain" />
          </header>

          <div className="space-y-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} onRead={onRead} />
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-4">
          <section className="rounded-sm border border-[#f4d782] bg-white px-5 py-6 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffd44a] text-[#8a551f]">
              <Icon className="h-8 w-8" name="chat" />
            </div>
            <h2 className="mt-4 text-2xl font-black text-[#263d2a]">Precisa de ajuda?</h2>
            <p className="mx-auto mt-3 max-w-[220px] text-sm font-bold leading-snug text-[#6c6b5f]">
              Conversar com um profissional pode fazer toda a diferenca. Voce nao precisa passar por isso sozinho.
            </p>
            <button
              type="button"
              onClick={() => setIsProfessionalOpen(true)}
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#5d8f44] px-4 text-[12px] font-black text-white"
            >
              <Icon className="h-4 w-4" name="chat" />
              Falar com profissional
            </button>
            <img src={plantinhaImg} alt="" className="mx-auto mt-5 h-36 w-44 object-contain" />
          </section>

          <section className="grid grid-cols-[56px_1fr] items-center gap-3 rounded-sm bg-white p-4 shadow-sm">
            <img src={mascoteImg} alt="" className="h-14 w-14 object-contain" />
            <div>
              <h2 className="text-sm font-black text-[#5d8f44]">Pequenas escolhas, grandes mudancas</h2>
              <p className="mt-1 text-[12px] font-bold text-[#6c6b5f]">Cuide de voce, uma dica de cada vez.</p>
            </div>
          </section>
        </aside>
      </div>

      {isProfessionalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
          <div className="relative w-full max-w-[360px] rounded-sm bg-white p-6 text-center shadow-xl">
            <button
              type="button"
              onClick={() => setIsProfessionalOpen(false)}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center text-[#263d2a]"
              aria-label="Fechar contato do profissional"
            >
              <Icon className="h-6 w-6" name="close" />
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

function Blog({ activePage, onNavigate, theme, onToggleTheme }) {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      {selectedPost ? (
        <BlogConteudo post={selectedPost} onBack={() => setSelectedPost(null)} />
      ) : (
        <BlogList onRead={setSelectedPost} />
      )}
    </AppFrame>
  )
}

export default Blog
