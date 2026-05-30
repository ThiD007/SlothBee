import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { AdminFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

const overviewCards = [
  { label: "Equipes ativas", value: "04", icon: "team" },
  { label: "Metas enviadas", value: "18", icon: "goals" },
  { label: "Posts no blog", value: "06", icon: "blog" },
]

const teamRows = [
  { name: "Equipe Colmeia", focus: "72%", rest: "28%" },
  { name: "Equipe Jardim", focus: "64%", rest: "36%" },
  { name: "Equipe Mel", focus: "58%", rest: "42%" },
]

function OverviewCard({ card }) {
  return (
    <section className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[12px] font-black uppercase text-[#8a551f]">{card.label}</p>
          <strong className="mt-2 block text-3xl font-black text-[#2f261d]">{card.value}</strong>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#fbe7c6] text-[#a36922]">
          {card.icon === "team" ? (
            <img src={colmeiaSimboloImg} alt="" className="h-9 w-9 object-cover" />
          ) : (
            <Icon className="h-7 w-7" name={card.icon} />
          )}
        </div>
      </div>
    </section>
  )
}

function AdminHome({ activePage, onNavigate }) {
  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[minmax(230px,1fr)_auto_1fr]">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
          <section className="relative grid min-h-[250px] overflow-hidden rounded-lg bg-white p-5 shadow-sm sm:block sm:p-0">
            <div className="relative z-10 max-w-[270px] sm:absolute sm:left-8 sm:top-8">
              <h1 className="text-3xl font-black text-[#9a5a1e]">Painel do administrador</h1>
              <p className="mt-3 text-sm font-bold leading-snug text-[#658a30]">
                Acompanhe equipes, metas e conteudos antes da integracao com o backend.
              </p>
            </div>
            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="relative mx-auto -mb-12 mt-2 h-[230px] w-[260px] object-cover sm:absolute sm:bottom-[-42px] sm:right-[6%] sm:mt-0 sm:h-[330px] sm:w-[360px]"
            />
          </section>

          <aside className="grid gap-3">
            <HoneyPoints value="2.450" label="Pontos de Mel" compact />
            <section className="rounded-lg bg-[#fbe7c6] p-4 text-center shadow-sm">
              <img src={abelhaImg} alt="" className="mx-auto h-12 w-12 object-cover" />
              <strong className="mt-2 block text-xl font-black text-[#2f261d]">82%</strong>
              <span className="text-[12px] font-bold text-[#8a551f]">Engajamento geral</span>
            </section>
          </aside>
        </div>

        <div className="grid gap-3 xl:grid-cols-3">
          {overviewCards.map((card) => (
            <OverviewCard key={card.label} card={card} />
          ))}
        </div>

        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_330px]">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
              <img src={colmeiaSimboloImg} alt="" className="h-8 w-8 object-cover" />
              Progresso das equipes
            </div>
            <div className="mt-4 space-y-4">
              {teamRows.map((team) => (
                <article key={team.name}>
                  <div className="mb-2 flex items-center justify-between text-[12px] font-black text-[#8a551f]">
                    <span>{team.name}</span>
                    <span className="text-[#85a834]">{team.focus} foco</span>
                  </div>
                  <ProgressBar left={team.focus} right={team.rest} />
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
              <img src={balancaImg} alt="" className="h-8 w-8 object-cover" />
              Metas em destaque
            </div>
            <div className="mt-4 space-y-3 text-[12px] font-bold text-[#765126]">
              <p className="rounded-md bg-[#f7f3e8] p-3">Beber agua ao iniciar uma sessao de foco.</p>
              <p className="rounded-md bg-[#f7f3e8] p-3">Fazer uma pausa consciente a cada ciclo.</p>
              <p className="rounded-md bg-[#f7f3e8] p-3">Registrar uma pequena vitoria do dia.</p>
            </div>
            <img src={mascoteAlmofadaImg} alt="" className="mx-auto mt-4 h-24 w-24 object-cover" />
          </section>
        </div>
      </section>
    </AdminFrame>
  )
}

export default AdminHome
