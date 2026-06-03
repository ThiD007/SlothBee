import { useEffect, useState } from "react"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import {
  createSelfcareGoal,
  deleteSelfcareGoal,
  getGoals,
  toggleGoal,
  updateSelfcareGoal,
} from "../services/goals.js"
import { getHoneyPoints } from "../services/points.js"
import { AppFrame, HoneyPoints, Icon } from "./shared.jsx"

const SELFCARE_GOAL_POINTS = 15
const emptyGoalForm = { text: "", points: SELFCARE_GOAL_POINTS }

function GoalGroup({ title, goals, editable, onToggle, onEdit, onDelete }) {
  return (
    <section className="rounded-sm bg-white px-5 py-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-contain" />
        <h1 className="text-base font-black text-[#87521f]">{title}</h1>
      </div>

      <div className="space-y-2">
        {goals.map((goal) => (
          <article
            key={goal.id}
            className="grid min-h-7 grid-cols-[auto_1fr_auto] items-center gap-2 text-[13px] font-bold text-[#8a551f]"
          >
            <input
              checked={goal.done}
              className="h-4 w-4 rounded border-[#d5b684] accent-[#a5bd43]"
              onChange={() => onToggle(goal.id)}
              type="checkbox"
            />
            <span>{goal.text}</span>
            <div className="flex items-center gap-2">
              <span className="font-black text-[#d38a18]">+{goal.points}</span>
              {editable && (
                <>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#f7f3e8] text-[#8a551f]"
                    onClick={() => onEdit(goal)}
                    type="button"
                  >
                    <Icon className="h-4 w-4" name="edit" />
                  </button>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-sm bg-[#8d5a27] text-white"
                    onClick={() => onDelete(goal.id)}
                    type="button"
                  >
                    <Icon className="h-4 w-4" name="trash" />
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      <p className="mt-5 rounded-sm bg-[#f7f3e8] px-3 py-2 text-[12px] font-black text-[#8a551f]">
        {editable ? "Voce pode adicionar, editar e remover estas metas." : "Metas enviadas pelo administrador."}
      </p>
    </section>
  )
}

function Metas({ activePage, onNavigate, theme, onToggleTheme }) {
  const [dailyGoals, setDailyGoals] = useState([])
  const [careGoals, setCareGoals] = useState([])
  const [honeyPoints, setHoneyPoints] = useState(0)
  const [form, setForm] = useState(emptyGoalForm)
  const [editingGoalId, setEditingGoalId] = useState(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  async function loadData() {
    try {
      setIsLoading(true)
      setMessage("")
      const [goalsData, pointsData] = await Promise.all([getGoals(), getHoneyPoints()])
      setDailyGoals(goalsData.today)
      setCareGoals(goalsData.selfcare)
      setHoneyPoints(pointsData.honeyPoints)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function handleToggle(goalId) {
    try {
      const data = await toggleGoal(goalId)
      setHoneyPoints(data.honeyPoints)
      setDailyGoals((goals) => goals.map((goal) => (goal.id === data.goal.id ? data.goal : goal)))
      setCareGoals((goals) => goals.map((goal) => (goal.id === data.goal.id ? data.goal : goal)))
    } catch (error) {
      setMessage(error.message)
    }
  }

  function handleEdit(goal) {
    setEditingGoalId(goal.id)
    setForm({ text: goal.text, points: SELFCARE_GOAL_POINTS })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setMessage("")
      const selfcareGoal = { ...form, points: SELFCARE_GOAL_POINTS }
      if (editingGoalId) {
        await updateSelfcareGoal(editingGoalId, selfcareGoal)
      } else {
        await createSelfcareGoal(selfcareGoal)
      }
      setForm(emptyGoalForm)
      setEditingGoalId(null)
      await loadData()
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleDelete(goalId) {
    try {
      await deleteSelfcareGoal(goalId)
      await loadData()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      <section className="grid min-h-[calc(100vh-1rem)] gap-4 rounded-sm bg-[#f7f7f7] p-5 shadow-sm lg:col-span-2 lg:grid-rows-[1fr_auto]">
        <div className="grid content-start gap-4 xl:grid-cols-2">
          <GoalGroup title="Metas de hoje" goals={dailyGoals} onToggle={handleToggle} />
          <div className="grid gap-4">
            <GoalGroup
              editable
              title="Metas de autocuidado"
              goals={careGoals}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />

            <form className="grid gap-3 rounded-sm bg-white px-5 py-4 shadow-sm" onSubmit={handleSubmit}>
              <h2 className="text-base font-black text-[#87521f]">
                {editingGoalId ? "Editar autocuidado" : "Nova meta de autocuidado"}
              </h2>
              <input
                className="h-9 rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
                placeholder="Ex: Alongar por 5 minutos"
                required
                value={form.text}
              />
              <p className="rounded-sm bg-[#f7f3e8] px-3 py-2 text-[12px] font-bold text-[#8a551f]">
                Cada meta de autocuidado vale {SELFCARE_GOAL_POINTS} pontos de mel.
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="selfcare-goal-submit h-9 rounded-sm px-4 text-[12px] font-black" type="submit">
                  {editingGoalId ? "Salvar meta" : "Adicionar meta"}
                </button>
                {editingGoalId && (
                  <button
                    className="h-9 rounded-sm bg-[#fbe7c6] px-4 text-[12px] font-black text-[#8a551f]"
                    onClick={() => {
                      setEditingGoalId(null)
                      setForm(emptyGoalForm)
                    }}
                    type="button"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] font-bold text-[#8a551f]">{isLoading ? "Carregando metas..." : message}</p>
          <div className="w-full max-w-[220px]">
            <HoneyPoints value={honeyPoints} compact />
          </div>
        </div>
      </section>
    </AppFrame>
  )
}

export default Metas
