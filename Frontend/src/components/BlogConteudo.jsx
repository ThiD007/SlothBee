import abelhaImg from "../public/slothBeeAbelha.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import { Icon } from "./shared.jsx"

function formatDate(value) {
  if (!value) return "SlothBee"

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
}

function BlogConteudo({ post, onBack }) {
  return (
    <section className="min-h-[calc(100vh-1rem)] rounded-lg bg-[#fffdf5] p-4 shadow-sm sm:p-6 lg:col-span-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-black text-[#5c7b2f] shadow-sm"
      >
        <Icon className="h-4 w-4" name="arrowLeft" />
        Voltar
      </button>

      <article className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="grid xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="grid content-center gap-4 p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-full bg-[#edf4d8] px-3 py-1 text-[11px] font-black uppercase text-[#4f8236]">
                {post.category}
              </span>
              <span className="text-[12px] font-black text-[#9a5a1e]">{formatDate(post.createdAt)}</span>
            </div>

            <h1 className="max-w-[820px] text-4xl font-black leading-tight text-[#263d2a] sm:text-5xl">{post.title}</h1>
            <p className="max-w-[720px] text-base font-bold leading-relaxed text-[#6c6b5f]">{post.summary}</p>
          </div>

          <div className={`min-h-[300px] overflow-hidden ${post.imageBg}`}>
            <img src={post.image} alt="" className="h-full min-h-[300px] w-full object-cover" />
          </div>
        </div>

        <div className="border-t border-[#efe3cf] bg-[#fffdf8] p-5 sm:p-8">
          <aside className="ml-auto grid max-w-[320px] content-start gap-4">
            <section className="rounded-lg bg-[#fff8dd] p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <img src={abelhaImg} alt="" className="h-9 w-9 object-contain" />
                <h2 className="text-base font-black text-[#8a551f]">Para praticar hoje</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm font-bold text-[#6f5b2e]">
                {post.tips.map((tip) => (
                  <li key={tip} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#a5bd43]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg bg-white p-4 text-center shadow-sm">
              <img src={mascoteAlmofadaImg} alt="" className="mx-auto h-24 w-24 object-contain" />
              <p className="mt-2 text-[12px] font-black leading-snug text-[#8a551f]">
                Uma pausa pequena tambem conta.
              </p>
            </section>
          </aside>
        </div>
      </article>
    </section>
  )
}

export default BlogConteudo
