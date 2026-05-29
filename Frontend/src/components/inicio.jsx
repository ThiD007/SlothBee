import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { AppFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

function Inicio({ activePage, onNavigate }) {
  return (
    <AppFrame
      activePage={activePage}
      onNavigate={onNavigate}
      rightColumn={
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
            <button className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#a5bd43] px-4 text-[1px] font-extrabold text-[#786018]">
              Iniciar foco
              <Icon className="h-5 w-5" name="play" />
            </button>
          </section>

          <HoneyPoints value="500" variant="tall" />
        </aside>
      }
    >
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
    </AppFrame>
  )
}

export default Inicio
