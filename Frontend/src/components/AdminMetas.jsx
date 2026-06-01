import { useEffect, useState } from "react"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import {
  createAdminTodayGoal,
  deleteAdminTodayGoal,
  getAdminTodayGoals,
  updateAdminTodayGoal,
} from "../services/goals.js"
import { AdminFrame, Icon } from "./shared.jsx"

const emptyGoalForm = { text: "", points: 10 }

function AdminMetas({ activePage, onNavigate }) {
  const [goals, setGoals] = useState([])
  const [form, setForm] = useState(emptyGoalForm)
  const [editingGoalId, setEditingGoalId] = useState(null)
  const [message, setMessage] = useState("")

  async function loadGoals() {
    try {
      const data = await getAdminTodayGoals()
      setGoals(data.goals)
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  function handleEdit(goal) {
    setEditingGoalId(goal.id)
    setForm({ text: goal.text, points: goal.points })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setMessage("")
      if (editingGoalId) {
        await updateAdminTodayGoal(editingGoalId, form)
      } else {
        await createAdminTodayGoal(form)
      }
      setForm(emptyGoalForm)
      setEditingGoalId(null)
      await loadGoals()
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleDelete(goalId) {
    try {
      await deleteAdminTodayGoal(goalId)
      await loadGoals()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid content-start gap-3">
          <header className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <img src={plantinhaImg} alt="" className="h-20 w-20 object-cover" />
              <div>
                <h1 className="text-3xl font-black text-[#9a5a1e]">Metas de hoje</h1>
                <p className="mt-1 text-sm font-bold text-[#658a30]">
                  Somente o administrador adiciona, edita e remove as metas de hoje.
                </p>
              </div>
            </div>
          </header>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-cover" />
              <h2 className="text-base font-black text-[#87521f]">Metas publicadas</h2>
            </div>

            <div className="space-y-3">
              {goals.map((goal) => (
                <article
                  key={goal.id}
                  className="grid gap-3 rounded-md bg-[#f7f3e8] p-3 text-[12px] font-bold text-[#8a551f] sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <strong className="block text-sm font-black text-[#6a431d]">{goal.text}</strong>
                  <span className="font-black text-[#d38a18]">+{goal.points}</span>
                  <div className="flex gap-2">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-[#8a551f]"
                      onClick={() => handleEdit(goal)}
                      type="button"
                    >
                      <Icon className="h-4 w-4" name="edit" />
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#8d5a27] text-white"
                      onClick={() => handleDelete(goal.id)}
                      type="button"
                    >
                      <Icon className="h-4 w-4" name="trash" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-3">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#87521f]">
              <Icon className="h-6 w-6 text-[#a36922]" name="plus" />
              {editingGoalId ? "Editar meta" : "Nova meta"}
            </div>

            <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Titulo
                <input
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                  onChange={(event) => setForm((current) => ({ ...current, text: event.target.value }))}
                  required
                  value={form.text}
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Pontos
                <input
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                  min="1"
                  onChange={(event) => setForm((current) => ({ ...current, points: Number(event.target.value) }))}
                  required
                  type="number"
                  value={form.points}
                />
              </label>
              {message && <p className="text-[12px] font-bold text-[#8a551f]">{message}</p>}
              <button
                className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
                type="submit"
              >
                {editingGoalId ? "Salvar meta" : "Enviar meta"}
                <Icon className="h-4 w-4" name="plus" />
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
                  Cancelar edicao
                </button>
              )}
            </form>
          </section>

          <section className="rounded-lg bg-[#fbe7c6] p-5 text-center shadow-sm">
            <img src={mascoteAlmofadaImg} alt="" className="mx-auto h-28 w-28 object-cover" />
            <h2 className="mt-2 text-base font-black text-[#8a551f]">Autocuidado e do usuario</h2>
            <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
              O administrador cuida apenas das metas de hoje. Cada usuario edita suas proprias metas de autocuidado.
            </p>
          </section>
        </aside>
      </section>
    </AdminFrame>
  )
}

export default AdminMetas
