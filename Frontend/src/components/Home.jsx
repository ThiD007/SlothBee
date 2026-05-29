import { useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import logoImg from "../public/slothBeeLogo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import florzinha from "../public/slothBeeFlorzinha.png"

const menuItems = [
  { icon: "home", label: "Inicio", active: true },
  { icon: "profile", label: "Perfil" },
  { icon: "goals", label: "Metas" },
  { icon: "blog", label: "Blog" },
]

function Icon({ name, className = "" }) {
  const icons = {
    home: (
      <path d="M8 2.4 2.5 6.8v6.7h3.4V9.7h4.2v3.8h3.4V6.8L8 2.4Zm0-1.3 6.8 5.4-.6.8-.7-.6v7.8H9.1v-3.8H6.9v3.8H2.5V6.7l-.7.6-.6-.8L8 1.1Z" />
    ),
    profile: (
      <path d="M8 8.1a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm0-1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm0 1.9c-3.4 0-5.9 1.8-5.9 4.1v.6h11.8v-.6C13.9 10.8 11.4 9 8 9Zm-4.8 3.7c.3-1.6 2.2-2.7 4.8-2.7s4.5 1.1 4.8 2.7H3.2Z" />
    ),
    goals: (
      <path d="M2.2 3.1h11.6v1H2.2v-1Zm0 4.4h11.6v1H2.2v-1Zm0 4.4h11.6v1H2.2v-1ZM1 2h2.8v3.2H1V2Zm1 1v1.2h.8V3H2Zm-1 3.4h2.8v3.2H1V6.4Zm1 1v1.2h.8V7.4H2Zm-1 3.4h2.8V14H1v-3.2Zm1 1V13h.8v-1.2H2Z" />
    ),
    blog: (
      <path d="M2 2.2h12v11.6H2V2.2Zm1 1v9.6h10V3.2H3Zm1.5 2h7v1h-7v-1Zm0 2.4h7v1h-7v-1Zm0 2.4h4.8v1H4.5v-1Z" />
    ),
    play: <path d="M5.4 3.4 12.3 8l-6.9 4.6V3.4Z" />,
    timer: (
      <path d="M6.8 1h2.4v1H8.5v1.1a5 5 0 1 1-1 0V2H6.8V1Zm1.2 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm.5 1.7v2.1l1.4 1.4-.7.7-1.7-1.7V5.7h1ZM12 3l.7-.7 1.1 1.1-.7.7L12 3Z" />
    ),
    close: (
      <path d="M3.4 2.3 8 6.9l4.6-4.6 1.1 1.1L9.1 8l4.6 4.6-1.1 1.1L8 9.1l-4.6 4.6-1.1-1.1L6.9 8 2.3 3.4l1.1-1.1Z" />
    ),
  }

  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function Logo({ className = "" }) {
  return (
    <div className={`h-10 w-28 overflow-hidden ${className}`}>
      <img src={logoImg} alt="SlothBee" className="h-45 w-50 -translate-y-16 scale-150 object-cover" />
    </div>
  )
}

function HoneyPoints({ value, compact = false, variant = "default" }) {
  let cardStyles = "p-4"
  if (compact) cardStyles = "p-3"
  if (variant === "tall") cardStyles = "h-full w-full py-10 px-7"
  const bgStyles = variant === "tall" ? "bg-[#fbe7c6]" : "bg-white"

  return (
    <section className={`rounded-lg ${bgStyles} ${cardStyles} shadow-sm transition-all`}>
      <div className="flex items-center justify-center gap-3">
        <img src={florzinha} alt="Florzinha" className="h-8 w-8 object-cover" />
        <div className="text-center leading-tight">
          <strong className="block text-base font-black text-[#2f261d]">{value}</strong>
          <span className="text-[12px] font-bold text-[#8a551f]">Pontos de Mel</span>
        </div>
      </div>
    </section>
  )
}

function ProgressBar({ left, right }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-[#e8dec6]">
      <div className="flex h-full">
        <span className="bg-[#f2b52f]" style={{ width: left }} />
        <span className="bg-[#91ad35]" style={{ width: right }} />
      </div>
    </div>
  )
}

function LandingPage({ isLoginOpen, onOpenLogin, onCloseLogin, onEnter }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f3f3f3] font-sans text-[#5c3717]">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-6 sm:px-10">
        <header className="flex flex-wrap items-center gap-4">
          <Logo />
          <p className="text-[13px] font-black leading-tight text-[#5f8f34]">
            Foque, descanse, seja sua melhor versão!
          </p>
        </header>

        <section className="grid flex-1 items-center gap-8 py-8 md:grid-cols-[minmax(240px,360px)_1fr] md:py-6">
          <article className="rounded-md border border-[#d7d0c5] bg-white/70 px-5 py-5 text-[13px] font-black leading-tight text-[#9a5a1e] shadow-sm md:ml-24">
            Bem-vindo ao SlothBee! Temos soluções inovadoras de bem-estar digital focada na rotina, que
            ajuda pessoas a encontrarem equilíbrio entre produtividade e saúde mental em um ambiente de
            trabalho. Em um mundo cheio de distrações e excesso de tarefas, nosso site incentiva o foco
            consciente, pausas necessárias e orientações de hábitos saudáveis, transformando a rotina em
            algo mais leve, organizado e sustentável. Trabalhar melhor não significa trabalhar mais —
            significa trabalhar com equilíbrio, qualidade e bem-estar.
            <span className="mt-2 block text-center text-3xl text-[#5f8f34]">{"\u2665"}</span>
          </article>

          <div className="relative min-h-[300px] md:min-h-[420px]">
            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="absolute left-1/2 top-1/2 h-[min(78vw,390px)] w-[min(82vw,400px)] -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </div>
        </section>

        <button
          type="button"
          onClick={onOpenLogin}
          className="absolute bottom-8 right-6 flex h-16 w-36 items-center justify-center gap-3 rounded-lg border-[3px] border-[#7c47167a] bg-[#fbe7c6] text-2xl font-black text-[#9a5a1e] shadow-sm sm:right-12"
        >
          Login
          <Icon className="h-7 w-7" name="play" />
        </button>
      </div>

      <img src={florzinha} alt="" className="absolute right-16 top-8 h-20 w-20 object-contain" />
      <img src={florzinha} alt="" className="absolute right-7 top-36 h-12 w-12 object-contain" />
      <img src={florzinha} alt="" className="absolute right-24 top-52 h-14 w-14 object-contain" />
      <img src={florzinha} alt="" className="absolute right-4 top-72 h-13 w-13 object-contain" />

      {isLoginOpen && <LoginModal onClose={onCloseLogin} onEnter={onEnter} />}
    </main>
  )
}

function LoginModal({ onClose, onEnter }) {
  function handleSubmit(event) {
    event.preventDefault()
    onEnter()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[500px] rounded-2xl bg-white px-7 pb-7 pt-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-7 top-5 flex h-9 w-9 items-center justify-center text-black"
          aria-label="Fechar login"
        >
          <Icon className="h-8 w-8" name="close" />
        </button>

        <h1 className="text-center text-3xl font-black text-[#9a5a1e]">Login</h1>

        <label className="mt-5 block text-sm font-bold text-[#9a5a1e]" htmlFor="email">
          E-mail:
        </label>
        <input
          id="email"
          type="email"
          className="mt-1 h-11 w-full rounded-full border border-[#d7b78a] bg-[#fffdf9] px-4 text-[#5c3717] outline-none"
        />

        <label className="mt-4 block text-sm font-bold text-[#9a5a1e]" htmlFor="password">
          Senha:
        </label>
        <input
          id="password"
          type="password"
          className="mt-1 h-11 w-full rounded-full border border-[#d7b78a] bg-[#fffdf9] px-4 text-[#5c3717] outline-none"
        />

        <div className="mt-7 flex items-center justify-end gap-3">
          <button type="button" className="text-lg font-black text-[#9a5a1e]">
            Cadastrar
          </button>
          <button type="submit" className="rounded-full bg-[#fbe7c6] px-6 py-3 text-lg font-black text-[#9a5a1e]">
            Entrar
          </button>
        </div>
      </form>
    </div>
  )
}

function Dashboard() {
  return (
<main className="min-h-screen bg-[#e9e9e9] pr-2 pb-2 pt-2 font-sans text-[#5c3717]">
        <div className="grid w-full gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-cols-[220px_minmax(0,1fr)_220px] xl:grid-cols-[260px_minmax(0,1fr)_250px]">
        <aside className="flex flex-col rounded-sm border-[3px] border-[#dadada] bg-white px-5 py-5 lg:min-h-[calc(100vh-1rem)]">
          <Logo />
          <p className="mt-3 max-w-[150px] text-[13px] font-bold leading-tight text-[#658a30]">
            Foque, descanse, seja sua melhor versão!
          </p>

          <nav className="mt-8 flex flex-wrap gap-3 lg:block lg:space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`flex h-8 min-w-32 items-center gap-2 rounded-lg px-3 text-left text-[14px] font-bold transition-colors lg:w-full ${
                  item.active ? "bg-[#f2f1ef] text-[#8b4f1e]" : "text-[#765126] hover:bg-[#fcfbf9]"
                }`}
              >
                <Icon className="h-5 w-5 text-[#a36922]" name={item.icon} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-4 h-px bg-[#ded1ab]" />

          <div className="mt-6 rounded-lg bg-[#f5f4f3] p-2.5 lg:mt-auto">
            <div className="flex items-center gap-2">
              <img
                src={mascoteAlmofadaImg}
                alt="Mascote SlothBee"
                className="h-15 w-15 rounded-md object-cover"
              />
              <p className="text-[12px] font-bold leading-tight text-[#8a551f]">
                Você está fazendo um ótimo trabalho, lembre-se de beber água.
              </p>
            </div>
          </div>
        </aside>

        <section className="grid min-h-[620px] gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[minmax(220px,1fr)_auto_auto]">
          <section className="relative min-h-[230px] overflow-hidden rounded-lg bg-white shadow-sm sm:min-h-[255px]">
            <div className="absolute left-[8%] top-14 z-10 h-28 w-35 -rotate-10 rounded-md bg-[#f5f2ed] p-4 shadow-md sm:left-[10%]">
              <p className="text-[20px] font-bold text-[#8b4f1e]">Bem vindo!</p>
              <span className="mt-5 block text-center text-3xl text-[#5f8f34]">{"\u2665"}</span>
            </div>

            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="absolute bottom-[-38px] right-[2%] h-[320px] w-[330px] object-cover sm:right-[10%]"
            />
          </section>

          <section className="rounded-lg bg-white px-5 py-3 shadow-sm sm:px-8">
            <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#b16f1e]">
              <img src={balancaImg} alt="" className="h-5 w-5 object-contain" />
              Equilíbrio
            </div>
            <div className="mt-2 grid grid-cols-2 items-center gap-4 text-center sm:gap-8">
              <div className="flex items-center justify-center gap-2">
                <img src={abelhaImg} alt="" className="h-8 w-8 object-contain" />
                <div className="text-left">
                  <p className="text-sm font-black text-[#6a431d]">Foco</p>
                  <p className="text-sm font-black text-[#e1a11f]">70%</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2">
                <img src={mascoteAlmofadaImg} alt="" className="h-8 w-8 object-contain" />
                <div className="text-left">
                  <p className="text-sm font-black text-[#6a431d]">Descanso</p>
                  <p className="text-sm font-black text-[#85a834]">30%</p>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <ProgressBar left="70%" right="30%" />
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#8a551f]">
              <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-contain" />
              Equipe progresso
            </div>
            <div className="mt-4 flex justify-around text-sm font-bold">
              <span className="text-[#e1a11f]">50%</span>
              <span className="text-[#85a834]">50%</span>
            </div>
            <div className="mt-3">
              <ProgressBar left="50%" right="50%" />
            </div>
          </section>
        </section>

        <aside className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[auto_minmax(280px,1fr)_auto]">
          <HoneyPoints value="250" compact />

          <section className="flex min-h-[330px] flex-col justify-between rounded-lg bg-white px-4 py-8 text-center shadow-sm lg:min-h-0">
            <div className="flex items-center justify-center gap-1 text-[12px] font-extrabold text-[#8d641e]">
              <Icon className="h-7 w-7 text-[#9dbb35]" name="timer" />
              Temporizador de foco
            </div>
            <div className="my-7 text-6xl font-black leading-none text-black">00:00</div>
            <span className="mx-auto inline-flex rounded-full bg-[#eee5bf] px-5 py-2 text-[12px] font-bold text-[#957334]">
              Sessão de foco
            </span>
            <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#a5bd43] px-4 text-[12px] font-extrabold text-[#786018]">
              Iniciar foco
              <Icon className="h-5 w-5" name="play" />
            </button>
          </section>

          <HoneyPoints value="500" variant="tall" />
        </aside>
      </div>
    </main>
  )
}

function Home() {
  const [screen, setScreen] = useState("landing")
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  if (screen === "dashboard") {
    return <Dashboard />
  }

  return (
    <LandingPage
      isLoginOpen={isLoginOpen}
      onOpenLogin={() => setIsLoginOpen(true)}
      onCloseLogin={() => setIsLoginOpen(false)}
      onEnter={() => setScreen("dashboard")}
    />
  )
}

export default Home
