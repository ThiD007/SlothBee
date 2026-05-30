import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import { AdminFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

const chartData = [
  { day: "Seg", focus: 62, rest: 38 },
  { day: "Ter", focus: 70, rest: 30 },
  { day: "Qua", focus: 58, rest: 42 },
  { day: "Qui", focus: 76, rest: 24 },
  { day: "Sex", focus: 68, rest: 32 },
]

const members = [
  { name: "Maria Eduarda", value: "84%" },
  { name: "Joao Pedro", value: "76%" },
  { name: "Ana Clara", value: "71%" },
  { name: "Lucas Lima", value: "67%" },
]

function AdminGraficoEquipe({ activePage, onNavigate }) {
  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[auto_1fr]">
        <header className="grid gap-3 rounded-lg bg-white p-5 shadow-sm xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex items-center gap-4">
            <img src={colmeiaSimboloImg} alt="" className="h-16 w-16 object-cover" />
            <div>
              <h1 className="text-3xl font-black text-[#9a5a1e]">Grafico da Equipe Colmeia</h1>
              <p className="mt-1 text-sm font-bold text-[#658a30]">
                Comparativo visual entre foco e descanso durante a semana.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("admin-equipes")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#edf4d8] px-4 text-[12px] font-black text-[#5c7b2f]"
          >
            <Icon className="h-4 w-4" name="arrowLeft" />
            Voltar
          </button>
        </header>

        <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="grid gap-3">
            <section className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
                  <Icon className="h-6 w-6 text-[#a36922]" name="chart" />
                  Desempenho semanal
                </div>
                <div className="flex gap-3 text-[12px] font-black">
                  <span className="inline-flex items-center gap-1 text-[#e1a11f]">
                    <span className="h-3 w-3 rounded-full bg-[#f2b52f]" />
                    Foco
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#85a834]">
                    <span className="h-3 w-3 rounded-full bg-[#91ad35]" />
                    Descanso
                  </span>
                </div>
              </div>

              <div className="mt-8 grid h-[300px] grid-cols-5 items-end gap-4 border-b border-[#e7d8b6] px-3">
                {chartData.map((item) => (
                  <div key={item.day} className="grid h-full grid-rows-[1fr_auto] gap-3 text-center">
                    <div className="flex items-end justify-center gap-2">
                      <span
                        className="w-8 rounded-t-md bg-[#f2b52f]"
                        style={{ height: `${item.focus}%` }}
                        aria-label={`${item.focus}% foco`}
                      />
                      <span
                        className="w-8 rounded-t-md bg-[#91ad35]"
                        style={{ height: `${item.rest}%` }}
                        aria-label={`${item.rest}% descanso`}
                      />
                    </div>
                    <strong className="text-[12px] font-black text-[#8a551f]">{item.day}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
                <img src={balancaImg} alt="" className="h-8 w-8 object-cover" />
                Equilibrio atual
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="text-center">
                  <img src={abelhaImg} alt="" className="mx-auto h-12 w-12 object-cover" />
                  <strong className="block text-xl font-black text-[#e1a11f]">72%</strong>
                  <span className="text-[12px] font-bold text-[#8a551f]">Foco</span>
                </div>
                <ProgressBar left="72%" right="28%" />
                <div className="text-center">
                  <img src={mascoteAlmofadaImg} alt="" className="mx-auto h-12 w-12 object-cover" />
                  <strong className="block text-xl font-black text-[#85a834]">28%</strong>
                  <span className="text-[12px] font-bold text-[#8a551f]">Descanso</span>
                </div>
              </div>
            </section>
          </div>

          <aside className="grid content-start gap-3">
            <HoneyPoints value="500" label="Pontos da equipe" variant="tall" />

            <section className="rounded-lg bg-white p-5 shadow-sm">
              <h2 className="text-base font-black text-[#8a551f]">Usuarios em destaque</h2>
              <div className="mt-4 space-y-3">
                {members.map((member) => (
                  <div key={member.name} className="grid grid-cols-[1fr_auto] items-center gap-3 text-[12px] font-bold">
                    <span className="text-[#765126]">{member.name}</span>
                    <span className="font-black text-[#85a834]">{member.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg bg-[#fbe7c6] p-5 shadow-sm">
              <h2 className="text-base font-black text-[#8a551f]">Leitura do adm</h2>
              <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
                A equipe esta com foco alto. A proxima meta pode incentivar pausas para manter o equilibrio.
              </p>
            </section>
          </aside>
        </section>
      </section>
    </AdminFrame>
  )
}

export default AdminGraficoEquipe
