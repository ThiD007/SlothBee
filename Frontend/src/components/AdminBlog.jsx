import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { AdminFrame, Icon, Logo } from "./shared.jsx"

const adminPosts = [
  {
    title: "Importancia de beber agua",
    category: "Saude",
    summary: "Conteudo para incentivar hidratacao durante ciclos de foco.",
    image: plantinhaImg,
    imageBg: "bg-[#dff4f7]",
  },
  {
    title: "Praticar exercicios no dia a dia",
    category: "Movimento",
    summary: "Dicas simples para reduzir sedentarismo na rotina de trabalho.",
    image: mascoteImg,
    imageBg: "bg-[#dff2dc]",
  },
  {
    title: "Uso excessivo de telas",
    category: "Saude mental",
    summary: "Orientacoes para equilibrar descanso e tempo de tela.",
    image: mascoteAlmofadaImg,
    imageBg: "bg-[#ffe5da]",
  },
  {
    title: "Alimentacao saudavel para foco",
    category: "Nutricao",
    summary: "Sugestoes para manter energia e concentracao ao longo do dia.",
    image: balancaImg,
    imageBg: "bg-[#e8f5d6]",
  },
]

function AdminPostCard({ post }) {
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
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#fbe7c6] text-[#8a551f]">
          <Icon className="h-4 w-4" name="edit" />
        </button>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#8d5a27] text-white">
          <Icon className="h-4 w-4" name="trash" />
        </button>
      </div>
    </article>
  )
}

function AdminBlog({ activePage, onNavigate }) {
  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate}>
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
            {adminPosts.map((post) => (
              <AdminPostCard key={post.title} post={post} />
            ))}
          </section>
        </div>

        <aside className="grid content-start gap-3">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#87521f]">
              <Icon className="h-6 w-6 text-[#a36922]" name="plus" />
              Novo blog
            </div>

            <form className="mt-4 grid gap-3">
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Titulo
                <input
                  readOnly
                  value="Pausas que ajudam o foco"
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Categoria
                <input
                  readOnly
                  value="Saude mental"
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Resumo
                <textarea
                  readOnly
                  value="Texto visual para demonstrar onde o adm escrevera a chamada do blog."
                  className="mt-1 min-h-24 w-full resize-none rounded-sm bg-[#f7f3e8] px-3 py-2 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <button
                type="button"
                className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
              >
                Adicionar blog
                <Icon className="h-4 w-4" name="plus" />
              </button>
            </form>
          </section>

          <section className="rounded-lg bg-[#fbe7c6] p-5 text-center shadow-sm">
            <img src={plantinhaImg} alt="" className="mx-auto h-32 w-36 object-cover" />
            <h2 className="text-base font-black text-[#8a551f]">Conteudo visual</h2>
            <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
              Quando o backend ficar pronto, este formulario pode alimentar a lista do blog.
            </p>
          </section>
        </aside>
      </section>
    </AdminFrame>
  )
}

export default AdminBlog
