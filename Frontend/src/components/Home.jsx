import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import bichoPreguicaImg from "../public/slothBeeBichoPreguiça.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import florzinhaImg from "../public/slothBeeFlorzinha.png"
import logoImg from "../public/slothBeeLogo.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"

const menuItems = [
  { icon: "house", label: "Inicio", active: true },
  { icon: "person", label: "Perfil" },
  { icon: "list", label: "Metas" },
  { icon: "journal", label: "Blog" },
  { icon: "basket", label: "Equipe" },
]

const focusBlocks = [
  {
    title: "Foco",
    value: "70%",
    icon: abelhaImg,
    color: "bg-[#f2b633]",
  },
  {
    title: "Descanso",
    value: "30%",
    icon: bichoPreguicaImg,
    color: "bg-[#86a93a]",
  },
]

function BootstrapIcon({ name, className = "" }) {
  const icons = {
    house: (
      <path d="M8.35 1.15a.5.5 0 0 0-.7 0L1.5 6.74a.5.5 0 0 0 .67.74L3 6.72V13.5a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5V10h1.5v3.5a.5.5 0 0 0 .5.5h3.25a.5.5 0 0 0 .5-.5V6.72l.83.76a.5.5 0 1 0 .67-.74L8.35 1.15ZM12 5.8V13H9.75V9.5a.5.5 0 0 0-.5-.5h-2.5a.5.5 0 0 0-.5.5V13H4V5.8l4-3.64 4 3.64Z" />
    ),
    person: (
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.29 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
    ),
    list: (
      <path d="M2 4.5A1.5 1.5 0 1 1 3.5 6 1.5 1.5 0 0 1 2 4.5Zm4-.5h8a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1Zm0 4h8a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1Zm0 4h8a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1ZM2 8.5A1.5 1.5 0 1 1 3.5 10 1.5 1.5 0 0 1 2 8.5Zm0 4A1.5 1.5 0 1 1 3.5 14 1.5 1.5 0 0 1 2 12.5Z" />
    ),
    journal: (
      <path d="M3 1.5A1.5 1.5 0 0 1 4.5 0h8A1.5 1.5 0 0 1 14 1.5v13a.5.5 0 0 1-.757.429L11.5 13.882l-1.743 1.047a.5.5 0 0 1-.514 0L7.5 13.882l-1.743 1.047a.5.5 0 0 1-.514 0L3.5 13.882l-1.743 1.047A.5.5 0 0 1 1 14.5v-13A1.5 1.5 0 0 1 2.5 0H3v1.5Zm1 0V13.5l1.243-.746a.5.5 0 0 1 .514 0L7.5 13.8l1.743-1.046a.5.5 0 0 1 .514 0L11.5 13.8l1.5-.9V1.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5ZM5.5 4h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1Zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1Zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1Z" />
    ),
    basket: (
      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L4.383 4h7.234L10.07 1.757a.5.5 0 1 1 .858-.514L12.83 4H14a1 1 0 0 1 1 1v1a1 1 0 0 1-.78.976l-1.344 6.722A1.5 1.5 0 0 1 11.405 15h-6.81a1.5 1.5 0 0 1-1.471-1.302L1.78 6.976A1 1 0 0 1 1 6V5a1 1 0 0 1 1-1h1.17l1.9-2.757a.5.5 0 0 1 .687-.172ZM2.806 7l1.299 6.502a.5.5 0 0 0 .49.398h6.81a.5.5 0 0 0 .49-.398L13.194 7H2.806ZM2 5v1h12V5H2Zm4.5 3.5a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5Zm3 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5Z" />
    ),
    stopwatch: (
      <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07A6.001 6.001 0 1 0 13.93 9H15a.5.5 0 0 0 0-1h-1.07A6.01 6.01 0 0 0 8 2.07V1h.5a.5.5 0 0 0 0-1h-2ZM8 14A5 5 0 1 1 8 4a5 5 0 0 1 0 10Zm.5-7.5a.5.5 0 0 0-1 0v2.707l1.646 1.647a.5.5 0 0 0 .708-.708L8.5 8.793V6.5Z" />
    ),
    play: <path d="M10.804 8 5 4.633v6.734L10.804 8Zm.696-.866a1 1 0 0 1 0 1.732l-6 3.464A1 1 0 0 1 4 11.464V4.536a1 1 0 0 1 1.5-.866l6 3.464Z" />,
  }

  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

function StatCard({ icon, value, label, tone = "light" }) {
  const toneClass =
    tone === "honey"
      ? "bg-[#ffe7b7] text-[#5a3517]"
      : "bg-white text-[#4d351f]"

  return (
    <section className={`${toneClass} rounded-2xl p-5 shadow-sm`}>
      <div className="flex items-center justify-center gap-4">
        <img src={icon} alt="" className="h-9 w-9 object-contain" />
        <div>
          <strong className="block text-2xl leading-none">{value}</strong>
          <span className="text-xs font-semibold">{label}</span>
        </div>
      </div>
    </section>
  )
}

function ProgressBar({ left, right }) {
  return (
    <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#e7d8bd]">
      <div className="flex h-full">
        <div className="bg-[#f4b73b]" style={{ width: left }} />
        <div className="bg-[#88a93c]" style={{ width: right }} />
      </div>
    </div>
  )
}

function Home() {
  return (
    <main className="min-h-screen bg-[#ececec] p-3 text-[#5b3517] sm:p-5">
      <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-7xl grid-cols-1 gap-4 lg:grid-cols-[260px_1fr_280px]">
        <aside className="flex flex-col rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-end gap-1">
            <img
              src={florzinhaImg}
              alt=""
              className="mb-5 h-5 w-5 object-contain"
            />
            <h1 className="text-3xl font-black leading-none tracking-normal">
              <span className="text-[#7a4b20]">Sloth</span>
              <span className="text-[#e49b18]">Bee</span>
            </h1>
          </div>

          <p className="mt-3 max-w-40 text-xs font-bold leading-snug text-[#6f8f34]">
            Foque, descanse, seja sua melhor versao!
          </p>

          <nav className="mt-8 space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                  item.active
                    ? "bg-[#f2efe9] text-[#91581e]"
                    : "text-[#7a4b20] hover:bg-[#f7f2e9]"
                }`}
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#d8b982] text-base">
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-[#d9cfb8] pt-5">
            <div className="flex gap-3 rounded-2xl bg-[#f8f1e5] p-3">
              <img
                src={mascoteAlmofadaImg}
                alt="Mascote SlothBee"
                className="h-16 w-16 rounded-xl object-contain"
              />
              <p className="text-xs font-bold leading-snug">
                Voce esta fazendo um otimo trabalho, lembre-se de beber agua.
              </p>
            </div>
          </div>
        </aside>

        <section className="space-y-4">
          <div className="relative overflow-hidden rounded-3xl border-4 border-[#1496ff] bg-white p-5 shadow-sm">
            <div className="absolute left-8 top-11 hidden rotate-[-12deg] rounded-xl bg-[#f5f3ef] px-8 py-7 text-xs font-bold text-[#8c5d25] shadow-md sm:block">
              Bem vindo!
              <span className="mt-5 block text-center text-3xl text-[#5f8a31]">
                ♥
              </span>
            </div>

            <div className="flex min-h-72 flex-col items-center justify-center gap-4 sm:min-h-80 md:flex-row">
              
              <img
                src={plantinhaImg}
                alt="Planta decorativa"
                className="hidden h-100 w-100 object-cover sm:block"
              />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_1fr]">
            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-center gap-2 text-lg font-extrabold text-[#a86a20]">
                <img
                  src={balancaImg}
                  alt=""
                  className="h-7 w-7 object-contain"
                />
                Equilibrio
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {focusBlocks.map((block) => (
                  <div key={block.title} className="text-center">
                    <img
                      src={block.icon}
                      alt=""
                      className="mx-auto h-10 w-10 object-contain"
                    />
                    <h3 className="mt-1 text-sm font-extrabold">
                      {block.title}
                    </h3>
                    <p className="mt-1 text-lg font-extrabold text-[#d4901f]">
                      {block.value}
                    </p>
                  </div>
                ))}
              </div>

              <ProgressBar left="70%" right="30%" />
            </section>

            <section className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-lg font-extrabold text-[#a86a20]">
                <img
                  src={colmeiaSimboloImg}
                  alt=""
                  className="h-8 w-8 object-contain"
                />
                Equipe progresso
              </div>

              <div className="mt-4 flex justify-around text-sm font-bold text-[#d79b22]">
                <span>50%</span>
                <span className="text-[#88a93c]">50%</span>
              </div>
              <ProgressBar left="50%" right="50%" />
            </section>
          </div>

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#5a3517]">
                  Colmeia da Sprint
                </h2>
                <p className="mt-1 text-sm font-semibold text-[#758544]">
                  Complete ciclos de foco, proteja suas pausas e expanda a
                  colmeia da equipe.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((cell) => (
                  <div
                    key={cell}
                    className={`grid h-12 w-12 place-items-center rounded-2xl text-sm font-black ${
                      cell < 5
                        ? "bg-[#f5bd3f] text-white"
                        : "bg-[#eef4df] text-[#86a93a]"
                    }`}
                  >
                    {cell < 5 ? "✓" : "+"}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>

        <aside className="space-y-4">
          <StatCard
            icon={colmeiaSimboloImg}
            value="250"
            label="Pontos de Mel"
          />

          <section className="rounded-3xl bg-white p-6 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-[#8aa332]">
              <span className="text-xl">⏱</span>
              Temporizador de foco
            </div>
            <div className="mt-5 text-6xl font-black tracking-normal text-black">
              00:00
            </div>
            <span className="mt-6 inline-flex rounded-full bg-[#efe5c7] px-5 py-2 text-xs font-bold text-[#967136]">
              Sessao de foco
            </span>
            <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#9dbb45] px-5 py-4 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#88a43b]">
              Iniciar foco
              <span className="text-xl">▶</span>
            </button>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-extrabold text-[#5a3517]">
              Bloqueio inteligente
            </h2>
            <div className="mt-4 space-y-3">
              {distractionApps.map((app) => (
                <div
                  key={app}
                  className="flex items-center justify-between rounded-xl bg-[#f7f2e9] px-4 py-3 text-sm font-bold"
                >
                  <span>{app}</span>
                  <span className="rounded-full bg-[#88a93c] px-3 py-1 text-xs text-white">
                    ativo
                  </span>
                </div>
              ))}
            </div>
          </section>

          <StatCard
            icon={florzinhaImg}
            value="500"
            label="Pontos de Mel"
            tone="honey"
          />
        </aside>
      </div>
    </main>
  )
}

export default Home
