import florzinha from "../public/slothBeeFlorzinha.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { Icon, Logo } from "./shared.jsx"

function LandingPage({ onOpenLogin }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f3f3] font-sans text-[#5c3717]">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 sm:px-10">
        <header className="flex flex-wrap items-center gap-4">
          <Logo />
          <p className="text-[13px] font-black leading-tight text-[#5f8f34]">
            Foque, descanse, seja sua melhor versão!
          </p>
        </header>

        <img src={florzinha} alt="" className="absolute right-260 top-15 h-20 w-20 object-cover" />
      <img src={florzinha} alt="" className="absolute right-250 top-36 h-12 w-12 object-cover" />
      <img src={florzinha} alt="" className="absolute right-270 top-52 h-14 w-15 object-cover" />
      <img src={florzinha} alt="" className="absolute right-250 top-72 h-15 w-15 object-cover " />
      <img src={florzinha} alt="" className="absolute right-265 top-90 h-20 w-20 object-cover" />
      <img src={florzinha} alt="" className="absolute right-257 top-118 h-20 w-17 object-cover" />

        <section className="grid flex-1 items-center gap-8 py-8 md:grid-cols-[minmax(240px,360px)_1fr] md:py-6">
          <article className="rounded-md border border-[#d7d0c5] bg-white/70 px-5 py-5 text-[13px] font-black leading-tight text-[#9a5a1e] shadow-sm md:ml-24">
            Bem-vindo ao SlothBee! Temos soluções inovadoras de bem-estar digital focada na rotina, que
            ajuda pessoas a encontrarem equilíbrio entre produtividade e saúde mental em um ambiente de
            trabalho. Em um mundo cheio de distrações e excesso de tarefas, nosso site incentiva o foco
            consciente, pausas necessárias e orientações de hábitos saudáveis, transformando a rotina em
            algo mais leve, organizado e sustentável. Trabalhar melhor não significa trabalhar mais,
            significa trabalhar com equilíbrio, qualidade e bem-estar.
            <span className="mt-2 block text-center text-3xl text-[#5f8f34]">{"\u2665"}</span>
          </article>

          <div className="relative min-h-[300px] md:min-h-[420px]">
            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="absolute left-1/2 top-1/2 h-[min(78vw,440px)] w-[min(82vw,420px)] -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </section>

        <button
          type="button"
          onClick={onOpenLogin}
          className="absolute bottom-8 right-6 flex h-16 w-36 items-center justify-center gap-3 rounded-lg border-[3px] border-[#9a5a1ea6] bg-[#fbe7c6] text-2xl font-black text-[#9a5a1e] shadow-sm sm:right-12"
        >
          Login
          <Icon className="h-7 w-7" name="play" />
        </button>
      </div>

      <img src={florzinha} alt="" className="absolute right-16 top-8 h-20 w-20 object-cover" />
      <img src={florzinha} alt="" className="absolute right-7 top-36 h-12 w-12 object-cover" />
      <img src={florzinha} alt="" className="absolute right-24 top-52 h-14 w-14 object-cover" />
      <img src={florzinha} alt="" className="absolute right-4 top-72 h-15 w-15 object-cover" />
    </main>
  )
}

export default LandingPage
