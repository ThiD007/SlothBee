import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import { AdminFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

const teams = [
  { name: "Equipe Colmeia", people: 12, points: 500, focus: "72%", rest: "28%", status: "Mais focada" },
  { name: "Equipe Jardim", people: 9, points: 420, focus: "64%", rest: "36%", status: "Em equilibrio" },
  { name: "Equipe Mel", people: 7, points: 360, focus: "58%", rest: "42%", status: "Precisa de pausa" },
  { name: "Equipe Flor", people: 10, points: 310, focus: "51%", rest: "49%", status: "Constante" },
]

function TeamCard({ team, onOpenChart }) {
  return (
    <article className="rounded-lg bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#fbe7c6]">
          <img src={colmeiaSimboloImg} alt="" className="h-12 w-12 object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-black text-[#8a551f]">{team.name}</h2>
            <span className="rounded-full bg-[#edf4d8] px-3 py-1 text-[11px] font-black text-[#638330]">
              {team.status}
            </span>
          </div>
          <p className="mt-1 text-[12px] font-bold text-[#765126]">{team.people} usuarios na equipe</p>
          <div className="mt-3 max-w-[520px]">
            <div className="mb-2 flex justify-around text-[12px] font-black">
              <span className="text-[#e1a11f]">{team.focus}</span>
              <span className="text-[#85a834]">{team.rest}</span>
            </div>
            <ProgressBar left={team.focus} right={team.rest} />
          </div>
        </div>

        <div className="grid gap-2 sm:min-w-[150px]">
          <HoneyPoints value={team.points} label="Pontos da equipe" compact />
          <button
            type="button"
            onClick={onOpenChart}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
          >
            Grafico
            <Icon className="h-4 w-4" name="chart" />
          </button>
        </div>
      </div>
    </article>
  )
}

function AdminEquipes({ activePage, onNavigate }) {
  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[auto_1fr]">
        <header className="grid gap-3 rounded-lg bg-white p-5 shadow-sm xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex items-center gap-4">
            <img src={mascoteImg} alt="" className="h-20 w-20 object-cover" />
            <div>
              <h1 className="text-3xl font-black text-[#9a5a1e]">Equipes</h1>
              <p className="mt-1 text-sm font-bold text-[#658a30]">
                Visualize os grupos, pontos e equilibrio de cada equipe.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
          >
            Nova equipe
            <Icon className="h-4 w-4" name="plus" />
          </button>
        </header>

        <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-3">
            {teams.map((team) => (
              <TeamCard key={team.name} team={team} onOpenChart={() => onNavigate("admin-grafico")} />
            ))}
          </div>

          <aside className="grid content-start gap-3">
            <section className="rounded-lg bg-white p-5 text-center shadow-sm">
              <img src={mascoteAlmofadaImg} alt="" className="mx-auto h-28 w-28 object-cover" />
              <h2 className="mt-2 text-lg font-black text-[#8a551f]">Ranking visual</h2>
              <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
                A equipe Colmeia lidera em foco e pode aparecer como destaque na home do administrador.
              </p>
            </section>

            <section className="rounded-lg bg-[#fbe7c6] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
                <Icon className="h-6 w-6" name="goals" />
                Acoes do adm
              </div>
              <div className="mt-4 grid gap-2">
                <button type="button" className="h-9 rounded-sm bg-white text-[12px] font-black text-[#8a551f]">
                  Editar equipe
                </button>
                <button type="button" className="h-9 rounded-sm bg-[#8d5a27] text-[12px] font-black text-white">
                  Excluir equipe
                </button>
              </div>
            </section>
          </aside>
        </section>
      </section>
    </AdminFrame>
  )
}

export default AdminEquipes
