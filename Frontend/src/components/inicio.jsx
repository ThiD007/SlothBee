import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { AppFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

const weeklyPoints = [
  [76, 132],
  [154, 56],
  [238, 108],
  [324, 68],
  [400, 92],
  [500, 34],
  [584, 92],
  [620, 76],
]

function Inicio({ activePage, onNavigate }) {
  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="inicio-layout">
        <section className="inicio-hero relative min-h-[170px] overflow-hidden rounded-lg bg-white shadow-sm sm:min-h-[220px]">
          <div className="absolute left-5 top-7 z-10 h-24 w-28 -rotate-12 rounded-md bg-[#fbfaf7] p-3 shadow-md sm:left-9 sm:top-9 sm:h-28 sm:w-32 sm:p-4">
            <p className="text-[13px] font-black text-[#8b4f1e] sm:text-[16px]">Bem vindo!</p>
            <span className="mt-5 block text-center text-2xl text-[#5f8f34] sm:mt-6 sm:text-3xl">{"\u2665"}</span>
          </div>

          <img
            src={plantinhaImg}
            alt="Mascote SlothBee"
            className="absolute bottom-[-16%] right-[-2%] h-[128%] w-auto max-w-none object-contain sm:right-[6%] lg:right-[3%] xl:right-[6%]"
          />
        </section>

        <aside className="inicio-side grid gap-2">
          <HoneyPoints
            value="250"
            compact
            className="flex h-full items-center justify-center [&_img]:h-8 [&_img]:w-8 [&_span]:text-[10px] [&_strong]:text-[14px]"
          />

          <section className="flex min-h-[190px] flex-col items-center justify-between rounded-lg bg-white px-4 py-4 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold leading-tight text-[#8d641e] xl:text-[12px]">
              <Icon className="h-7 w-7 shrink-0 text-[#9dbb35]" name="timer" />
              Temporizador de foco
            </div>
            <div className="my-3 text-5xl font-black leading-none text-black xl:text-6xl">00:00</div>
            <span className="mx-auto inline-flex rounded-full bg-[#eee5bf] px-5 py-2 text-[10px] font-bold text-[#957334] xl:text-[11px]">
              Sessão de foco
            </span>
            <button className="mt-2 flex h-11 w-full max-w-[150px] items-center justify-center gap-2 rounded-md bg-[#a5bd43] text-[11px] font-extrabold text-[#786018] transition-colors hover:bg-[#97ad39]">
              Iniciar foco
              <Icon className="h-5 w-5" name="play" />
            </button>
          </section>
        </aside>

        <section className="inicio-balance rounded-lg border-2 border-[#168ff0] bg-white px-4 py-2 shadow-sm sm:px-7">
          <div className="flex items-center justify-center gap-2 text-[13px] font-extrabold text-[#b16f1e]">
            <img src={balancaImg} alt="" className="h-6 w-6 object-cover" />
            Equilíbrio
          </div>
          <div className="mt-1.5 grid grid-cols-2 items-center gap-3 text-center sm:gap-8">
            <div className="flex items-center justify-center gap-2">
              <img src={abelhaImg} alt="" className="h-8 w-8 object-cover" />
              <div className="text-left">
                <p className="text-[12px] font-black text-[#6a431d]">Foco</p>
                <p className="text-[12px] font-black text-[#e1a11f]">70%</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <img src={mascoteAlmofadaImg} alt="" className="h-8 w-8 object-cover" />
              <div className="text-left">
                <p className="text-[12px] font-black text-[#6a431d]">Descanso</p>
                <p className="text-[12px] font-black text-[#85a834]">30%</p>
              </div>
            </div>
          </div>
          <div className="mt-1.5">
            <ProgressBar left="70%" right="30%" />
          </div>
        </section>

        <section className="inicio-team rounded-lg bg-white px-4 py-3 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_180px] sm:items-center lg:grid-cols-[minmax(0,1fr)_190px]">
            <div>
              <div className="flex items-center gap-2 text-[13px] font-extrabold text-[#8a551f]">
                <img src={colmeiaSimboloImg} alt="" className="h-6 w-6 object-cover" />
                Equipe progresso
              </div>
              <div className="mt-3 flex justify-around text-[13px] font-bold">
                <span className="text-[#e1a11f]">50%</span>
                <span className="text-[#85a834]">50%</span>
              </div>
              <div className="mt-2">
                <ProgressBar left="50%" right="50%" />
              </div>
            </div>

            <HoneyPoints
              value="500"
              variant="tall"
              className="self-center py-3 sm:h-[70px] [&_img]:h-8 [&_img]:w-8 [&_span]:text-[10px] [&_strong]:text-[14px]"
            />
          </div>
        </section>

        <section className="inicio-insights overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="px-5 pb-3 pt-4">
            <h2 className="text-[18px] font-black text-[#4d3323]">Seu Progresso</h2>
            <div className="mt-2 h-40">
              <svg className="h-full w-full" viewBox="0 0 640 190" role="img" aria-label="Gráfico de progresso semanal">
                <defs>
                  <linearGradient id="progressArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b7cb72" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#f6f0db" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <g className="text-[12px] font-bold" fill="#8f887c">
                  <text x="8" y="30">100</text>
                  <text x="14" y="72">75</text>
                  <text x="14" y="114">50</text>
                  <text x="14" y="156">25</text>
                  <text x="20" y="182">0</text>
                </g>
                <g stroke="#efe6d3" strokeWidth="1">
                  <line x1="54" x2="620" y1="24" y2="24" />
                  <line x1="54" x2="620" y1="66" y2="66" />
                  <line x1="54" x2="620" y1="108" y2="108" />
                  <line x1="54" x2="620" y1="150" y2="150" />
                </g>
                <path
                  d="M76 132 C100 110 112 55 154 56 C190 57 206 109 238 108 C274 107 290 70 324 68 C364 66 374 94 400 92 C438 90 468 23 500 34 C538 47 560 98 584 92 C600 88 610 80 620 76 L620 150 L76 150 Z"
                  fill="url(#progressArea)"
                />
                <path
                  d="M76 132 C100 110 112 55 154 56 C190 57 206 109 238 108 C274 107 290 70 324 68 C364 66 374 94 400 92 C438 90 468 23 500 34 C538 47 560 98 584 92 C600 88 610 80 620 76"
                  fill="none"
                  stroke="#7ea34a"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
                {weeklyPoints.map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} fill="#86a957" r="6" />
                ))}
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
                  <text key={day} x={76 + index * 84} y="178" fill="#8f887c" fontSize="13" fontWeight="700" textAnchor="middle">
                    {day}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          <div className="grid gap-4 border-t border-[#efe3cf] bg-[#fffaf0] px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#8cb4dc] text-[#7aa1cb]">
                <Icon className="h-7 w-7" name="timer" />
              </span>
              <div>
                <p className="text-[15px] font-black text-[#4d3323]">Melhor Horário</p>
                <strong className="block text-[24px] leading-tight text-[#2f241d]">09:00 - 11:00</strong>
                <span className="text-[14px] font-bold text-[#8f887c]">Você é mais produtivo!</span>
              </div>
            </div>

            <div className="hidden h-16 w-px bg-[#ead7b9] sm:block" />

            <div className="flex items-center justify-between gap-4">
              <div className="inicio-sun" aria-hidden="true" />
              <div className="text-right">
                <p className="text-[15px] font-black text-[#4d3323]">Total de Foco</p>
                <strong className="block text-[24px] leading-tight text-[#2f241d]">12h 45m</strong>
                <span className="text-[14px] font-bold text-[#8f887c]">esta semana</span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </AppFrame>
  )
}

export default Inicio
