import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import { AppFrame, HoneyPoints, Icon } from "./shared.jsx"

const dailyGoals = [
  { text: "Beber 2 copos de água", points: 50, done: true },
  { text: "Fazer 30 min de caminhada", points: 20 },
  { text: "Planejar o almoço", points: 20 },
  { text: "Meditar 10 min", points: 50 },
  { text: "Anotar uma tarefa leve", points: 15 },
]

const careGoals = [
  { text: "Checar postura no foco", points: 50, done: true },
  { text: "Fazer pausas conscientes", points: 25 },
  { text: "Alongar o corpo", points: 20 },
  { text: "Modo sem tela", points: 30 },
  { text: "Cuidar do humor", points: 15 },
]

function GoalGroup({ title, goals }) {
  return (
    <section className="rounded-sm bg-white px-5 py-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-contain" />
        <h1 className="text-base font-black text-[#87521f]">{title}</h1>
      </div>

      <div className="space-y-2">
        {goals.map((goal) => (
          <label
            key={goal.text}
            className="grid min-h-7 grid-cols-[auto_1fr_auto] items-center gap-2 text-[13px] font-bold text-[#8a551f]"
          >
            <input
              type="checkbox"
              defaultChecked={goal.done}
              className="h-4 w-4 rounded border-[#d5b684] accent-[#a5bd43]"
            />
            <span>{goal.text}</span>
            <span className="font-black text-[#d38a18]">+{goal.points}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          className="inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
        >
          Adicionar meta
          <Icon className="h-4 w-4" name="plus" />
        </button>
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#8d5a27] text-white"
          aria-label="Excluir meta"
        >
          <Icon className="h-4 w-4" name="trash" />
        </button>
      </div>
    </section>
  )
}

function Metas({ activePage, onNavigate }) {
  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="grid min-h-[calc(100vh-1rem)] gap-4 rounded-sm bg-[#f7f7f7] p-5 shadow-sm lg:col-span-2 lg:grid-rows-[1fr_auto]">
        <div className="grid content-start gap-4 xl:grid-cols-2">
          <GoalGroup title="Metas de hoje" goals={dailyGoals} />
          <GoalGroup title="Metas de autocuidado" goals={careGoals} />
        </div>

        <div className="flex justify-end">
          <div className="w-full max-w-[220px]">
            <HoneyPoints value="250" compact />
          </div>
        </div>
      </section>
    </AppFrame>
  )
}

export default Metas
