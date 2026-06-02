import { useEffect, useMemo, useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { getAdminGoalsSummary } from "../services/goals.js"
import { getTeams } from "../services/teams.js"
import { AdminFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

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

function AdminHome({ activePage, onNavigate, theme, onToggleTheme }) {
  const [teams, setTeams] = useState([])
  const [goalsSummary, setGoalsSummary] = useState({ totalSentGoals: 0, activeSentGoals: 0 })
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadAdminHome() {
      try {
        setIsLoading(true)
        setMessage("")
        const [teamsData, goalsData] = await Promise.all([getTeams(), getAdminGoalsSummary()])
        if (!ignore) {
          setTeams(Array.isArray(teamsData.teams) ? teamsData.teams : [])
          setGoalsSummary(goalsData.summary || { totalSentGoals: 0, activeSentGoals: 0 })
        }
      } catch (error) {
        if (!ignore) setMessage(error.message)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadAdminHome()

    return () => {
      ignore = true
    }
  }, [])

  const totalTeamPoints = teams.reduce((sum, team) => sum + Number(team.pontos_equipe || 0), 0)
  const engagement = teams.length
    ? Math.round(teams.reduce((sum, team) => sum + Number(team.balance?.focus?.percentage || 0), 0) / teams.length)
    : 0

  const teamRows = useMemo(
    () =>
      [...teams]
        .sort((left, right) => Number(right.pontos_equipe || 0) - Number(left.pontos_equipe || 0))
        .slice(0, 3)
        .map((team) => ({
          name: team.nome_equipe,
          focus: `${team.balance?.focus?.percentage ?? 0}%`,
          rest: `${team.balance?.rest?.percentage ?? 0}%`,
        })),
    [teams]
  )

  const overviewCards = [
    { label: "Equipes ativas", value: String(teams.length).padStart(2, "0"), icon: "team" },
    { label: "Metas enviadas", value: String(goalsSummary.activeSentGoals || 0).padStart(2, "0"), icon: "goals" },
    { label: "Posts no blog", value: "06", icon: "blog" },
  ]

  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[minmax(230px,1fr)_auto_1fr]">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_260px]">
          <section className="relative grid min-h-[250px] overflow-hidden rounded-lg bg-white p-5 shadow-sm sm:block sm:p-0">
            <div className="relative z-10 max-w-[270px] sm:absolute sm:left-8 sm:top-8">
              <h1 className="text-3xl font-black text-[#9a5a1e]">Painel do administrador</h1>
              <p className="mt-3 text-sm font-bold leading-snug text-[#658a30]">
                Acompanhe equipes, metas e conteudos conectados ao backend.
              </p>
              {message && <p className="mt-3 text-[12px] font-bold text-[#8a551f]">{message}</p>}
              {isLoading && <p className="mt-3 text-[12px] font-bold text-[#8a551f]">Carregando resumo...</p>}
            </div>
            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="relative mx-auto -mb-12 mt-2 h-[230px] w-[260px] sm:absolute sm:bottom-[-92px] sm:right-[6%] sm:mt-0 sm:h-[550px] sm:w-[370px]"
            />
          </section>

          <aside className="grid gap-3">
            <HoneyPoints value={totalTeamPoints} label="Pontos de Mel" compact />
            <section className="rounded-lg bg-[#fbe7c6] p-4 text-center shadow-sm">
              <img src={abelhaImg} alt="" className="mx-auto h-12 w-12 object-cover" />
              <strong className="mt-2 block text-xl font-black text-[#2f261d]">{engagement}%</strong>
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
                    <span className="flex gap-2">
                      <span className="text-[#e1a11f]">{team.focus} foco</span>
                      <span className="text-[#85a834]">{team.rest} descanso</span>
                    </span>
                  </div>
                  <ProgressBar left={team.focus} right={team.rest} />
                </article>
              ))}
              {!isLoading && teamRows.length === 0 && (
                <p className="rounded-md bg-[#f7f3e8] p-3 text-[12px] font-bold text-[#765126]">
                  Nenhuma equipe cadastrada ainda.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
              <img src={balancaImg} alt="" className="h-8 w-8 object-cover" />
              Metas em destaque
            </div>
            <div className="mt-4 space-y-3 text-[12px] font-bold text-[#765126]">
              <p className="rounded-md bg-[#f7f3e8] p-3">
                {goalsSummary.activeSentGoals > 0
                  ? `${goalsSummary.activeSentGoals} metas de hoje ativas foram enviadas pelo administrador.`
                  : "Nenhuma meta enviada pelo administrador ainda."}
              </p>
              <p className="rounded-md bg-[#f7f3e8] p-3">
                Total historico de metas enviadas: {goalsSummary.totalSentGoals || 0}.
              </p>
            </div>
            <img src={mascoteAlmofadaImg} alt="" className="mx-auto mt-4 h-24 w-24 object-cover" />
          </section>
        </div>
      </section>
    </AdminFrame>
  )
}

export default AdminHome
