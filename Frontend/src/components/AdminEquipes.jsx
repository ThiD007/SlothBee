import { useEffect, useMemo, useState } from "react"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import { getUsers } from "../services/auth.js"
import { createTeam, deleteTeam, getTeams, updateTeam } from "../services/teams.js"
import { AdminFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

const emptyTeamForm = { nome_equipe: "", integrantes: [] }

function getTeamProgress(team) {
  const focus = team.balance?.focus || {}
  const rest = team.balance?.rest || {}
  const focusValue = Number(focus.percentage ?? 0)
  const restValue = Number(rest.percentage ?? 100)
  const barTotal = Math.max(focusValue + restValue, 1)
  const barFocusValue = Math.round((focusValue / barTotal) * 100)
  const barRestValue = Math.max(0, 100 - barFocusValue)

  return {
    focus: `${focusValue}%`,
    rest: `${restValue}%`,
    barFocus: `${barFocusValue}%`,
    barRest: `${barRestValue}%`,
    focusLabel: focus.label || "foco",
    restLabel: rest.label || "descanso",
    focusColor: focus.color || "#f2b52f",
    restColor: rest.color || "#91ad35",
  }
}

function getTeamStatus(team) {
  const metas = Number(team.metas_equipe || 0)
  if (metas >= 10) return "Mais focada"
  if (metas >= 5) return "Em equilibrio"
  if (metas > 0) return "Constante"
  return "Sem metas ainda"
}

function TeamCard({ team, onEdit, onDelete, onOpenChart }) {
  const progress = getTeamProgress(team)

  return (
    <article className="rounded-lg bg-white p-4 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-[auto_1fr_auto] sm:items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#fbe7c6]">
          <img src={colmeiaSimboloImg} alt="" className="h-12 w-12 object-cover" />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-black text-[#8a551f]">{team.nome_equipe}</h2>
            <span className="rounded-full bg-[#edf4d8] px-3 py-1 text-[11px] font-black text-[#638330]">
              {getTeamStatus(team)}
            </span>
          </div>
          <p className="mt-1 text-[12px] font-bold text-[#765126]">
            {team.total_integrantes} usuarios na equipe - {team.metas_equipe} metas cumpridas
          </p>
          <div className="mt-3 max-w-[520px]">
            <div className="mb-2 flex justify-around text-[12px] font-black">
              <span style={{ color: progress.focusColor }}>
                {progress.focus} {progress.focusLabel}
              </span>
              <span style={{ color: progress.restColor }}>
                {progress.rest} {progress.restLabel}
              </span>
            </div>
            <ProgressBar left={progress.barFocus} right={progress.barRest} />
          </div>
        </div>

        <div className="grid gap-2 sm:min-w-[150px]">
          <HoneyPoints value={team.pontos_equipe} label="Pontos da equipe" compact />
          <button
            type="button"
            onClick={onOpenChart}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
          >
            Grafico
            <Icon className="h-4 w-4" name="chart" />
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onEdit(team)}
              className="h-8 rounded-sm bg-[#fbe7c6] text-[12px] font-black text-[#8a551f]"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => onDelete(team.id)}
              className="h-8 rounded-sm bg-[#8d5a27] text-[12px] font-black text-white"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function AdminEquipes({ activePage, onNavigate, theme, onToggleTheme }) {
  const [teams, setTeams] = useState([])
  const [users, setUsers] = useState([])
  const [form, setForm] = useState(emptyTeamForm)
  const [editingTeamId, setEditingTeamId] = useState(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  async function loadData() {
    try {
      setIsLoading(true)
      setMessage("")
      const accessToken = localStorage.getItem("accessToken")
      const [teamsData, usersData] = await Promise.all([getTeams(), getUsers(accessToken)])
      setTeams(Array.isArray(teamsData.teams) ? teamsData.teams : [])
      setUsers(Array.isArray(usersData.users) ? usersData.users : [])
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const topTeam = useMemo(() => {
    if (teams.length === 0) return null
    return [...teams].sort((left, right) => Number(right.pontos_equipe || 0) - Number(left.pontos_equipe || 0))[0]
  }, [teams])

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleMemberToggle(userId) {
    setForm((current) => {
      const isSelected = current.integrantes.includes(userId)
      const integrantes = isSelected
        ? current.integrantes.filter((id) => id !== userId)
        : [...current.integrantes, userId]

      return { ...current, integrantes }
    })
  }

  function handleNewTeam() {
    setForm(emptyTeamForm)
    setEditingTeamId(null)
    setShowForm(true)
    setMessage("")
  }

  function handleEdit(team) {
    setForm({
      nome_equipe: team.nome_equipe || "",
      integrantes: Array.isArray(team.integrantes) ? team.integrantes : [],
    })
    setEditingTeamId(team.id)
    setShowForm(true)
    setMessage("")
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setMessage("")
      if (editingTeamId) {
        await updateTeam(editingTeamId, form)
      } else {
        await createTeam(form)
      }

      setForm(emptyTeamForm)
      setEditingTeamId(null)
      setShowForm(false)
      await loadData()
      setMessage(editingTeamId ? "Equipe atualizada com sucesso." : "Equipe criada com sucesso.")
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleDelete(id) {
    const shouldDelete = window.confirm("Deseja excluir esta equipe? Os usuarios dela ficarao sem equipe.")
    if (!shouldDelete) return

    try {
      setMessage("")
      await deleteTeam(id)
      await loadData()
      if (editingTeamId === id) {
        setEditingTeamId(null)
        setForm(emptyTeamForm)
        setShowForm(false)
      }
      setMessage("Equipe excluida com sucesso.")
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[auto_1fr]">
        <header className="grid gap-3 rounded-lg bg-white p-5 shadow-sm xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex items-center gap-4">
            <img src={mascoteImg} alt="" className="h-20 w-20 object-cover" />
            <div>
              <h1 className="text-3xl font-black text-[#9a5a1e]">Equipes</h1>
              <p className="mt-1 text-sm font-bold text-[#658a30]">
                Visualize os grupos, integrantes, pontos e equilibrio de cada equipe.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNewTeam}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
          >
            Nova equipe
            <Icon className="h-4 w-4" name="plus" />
          </button>
        </header>

        <section className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-3">
            {showForm && (
              <form className="grid gap-3 rounded-lg bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
                <h2 className="text-lg font-black text-[#8a551f]">
                  {editingTeamId ? "Editar equipe" : "Nova equipe"}
                </h2>
                <label className="text-[12px] font-black text-[#8c9b3b]">
                  Nome da equipe
                  <input
                    className="mt-1 h-10 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                    name="nome_equipe"
                    onChange={handleChange}
                    placeholder="Ex: Equipe Colmeia"
                    required
                    value={form.nome_equipe}
                  />
                </label>
                <section className="rounded-sm bg-[#f7f3e8] p-3">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-[12px] font-black text-[#8c9b3b]">Integrantes da equipe</h3>
                    <span className="text-[12px] font-black text-[#8a551f]">
                      {form.integrantes.length} selecionados
                    </span>
                  </div>

                  <div className="grid max-h-64 gap-2 overflow-auto pr-1 sm:grid-cols-2">
                    {users.map((user) => {
                      const isSelected = form.integrantes.includes(user.id)
                      const belongsToOtherTeam = user.equipe_id && user.equipe_id !== editingTeamId

                      return (
                        <label
                          key={user.id}
                          className={`flex items-center gap-2 rounded-sm bg-white p-3 text-[12px] font-bold text-[#765126] ${
                            isSelected ? "ring-2 ring-[#b3c843]" : ""
                          }`}
                        >
                          <input
                            checked={isSelected}
                            className="h-4 w-4 accent-[#a5bd43]"
                            onChange={() => handleMemberToggle(user.id)}
                            type="checkbox"
                          />
                          <span className="min-w-0">
                            <strong className="block truncate text-[#5c3717]">{user.nome || "Usuario"}</strong>
                            <span className="block truncate">
                              {belongsToOtherTeam ? "Esta em outra equipe" : user.cargo || user.email || "Sem cargo"}
                            </span>
                          </span>
                        </label>
                      )
                    })}
                  </div>

                  {users.length === 0 && (
                    <p className="text-[12px] font-bold text-[#8a551f]">Nenhum usuario cadastrado para selecionar.</p>
                  )}
                </section>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="submit"
                    className="h-9 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
                  >
                    {editingTeamId ? "Salvar equipe" : "Criar equipe"}
                  </button>
                  <button
                    type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingTeamId(null)
                      setForm(emptyTeamForm)
                    }}
                    className="h-9 rounded-sm bg-[#fbe7c6] px-4 text-[12px] font-black text-[#8a551f]"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}

            {message && <p className="rounded-lg bg-[#fbe7c6] p-3 text-[12px] font-bold text-[#8a551f]">{message}</p>}
            {isLoading && <p className="rounded-lg bg-white p-4 text-[12px] font-bold text-[#8a551f]">Carregando equipes...</p>}

            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onOpenChart={() => {
                  localStorage.setItem("adminChartTeamId", String(team.id))
                  onNavigate("admin-grafico")
                }}
              />
            ))}

            {!isLoading && teams.length === 0 && (
              <p className="rounded-lg bg-white p-4 text-[12px] font-bold text-[#8a551f]">
                Nenhuma equipe cadastrada ainda.
              </p>
            )}
          </div>

          <aside className="grid content-start gap-3">
            <section className="rounded-lg bg-white p-5 text-center shadow-sm">
              <img src={mascoteAlmofadaImg} alt="" className="mx-auto h-28 w-28 object-cover" />
              <h2 className="mt-2 text-lg font-black text-[#8a551f]">Ranking visual</h2>
              <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
                {topTeam
                  ? `${topTeam.nome_equipe} lidera com ${topTeam.pontos_equipe} pontos de mel.`
                  : "Cadastre equipes para ver o destaque do ranking."}
              </p>
            </section>

            <section className="rounded-lg bg-[#fbe7c6] p-5 shadow-sm">
              <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
                <Icon className="h-6 w-6" name="goals" />
                Acoes do adm
              </div>
              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={handleNewTeam}
                  className="h-9 rounded-sm bg-white text-[12px] font-black text-[#8a551f]"
                >
                  Criar equipe
                </button>
                <button
                  type="button"
                  disabled={!topTeam}
                  onClick={() => {
                    if (topTeam) handleEdit(topTeam)
                  }}
                  className="h-9 rounded-sm bg-[#8d5a27] text-[12px] font-black text-white disabled:opacity-60"
                >
                  Editar equipe
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
