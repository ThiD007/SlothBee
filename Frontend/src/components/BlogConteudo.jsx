import { Icon } from "./shared.jsx"

function BlogConteudo({ post, onBack }) {
  return (
    <section className="min-h-[calc(100vh-1rem)] rounded-sm bg-[#fffdf5] p-5 shadow-sm lg:col-span-2">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex h-9 items-center gap-2 rounded-sm bg-[#edf4d8] px-4 text-[13px] font-black text-[#5c7b2f]"
      >
        <Icon className="h-4 w-4" name="arrowLeft" />
        Voltar
      </button>

      <article className="grid gap-6 rounded-sm bg-white p-5 shadow-sm xl:grid-cols-[280px_minmax(0,1fr)]">
        <div className={`flex min-h-[260px] items-center justify-center rounded-sm ${post.imageBg}`}>
          <img src={post.image} alt="" className="h-56 w-56 object-contain" />
        </div>

        <div>
          <span className="inline-flex rounded-sm bg-[#dff0c8] px-3 py-1 text-[11px] font-black uppercase text-[#4f8236]">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-[#263d2a]">{post.title}</h1>
          <p className="mt-3 text-base font-bold leading-relaxed text-[#6c6b5f]">{post.summary}</p>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-4 text-sm font-semibold leading-relaxed text-[#6a5a3f]">
              {post.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <aside className="rounded-sm border border-[#f0dda5] bg-[#fff8dd] p-4">
              <h2 className="text-base font-black text-[#8a551f]">Para praticar hoje</h2>
              <ul className="mt-3 space-y-3 text-sm font-bold text-[#6f5b2e]">
                {post.tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#a5bd43]" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </article>
    </section>
  )
}

export default BlogConteudo
