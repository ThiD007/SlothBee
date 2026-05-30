import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { AdminFrame, Icon } from "./shared.jsx"

const goalGroups = [
  {
    title: "Metas de hoje",
    goals: [
      { text: "Beber 2 copos de agua", points: 50, team: "Todas as equipes" },
      { text: "Fazer 30 min de caminhada", points: 20, team: "Equipe Jardim" },
      { text: "Planejar o almoco", points: 20, team: "Equipe Colmeia" },
    ],
  },
  {
    title: "Metas de autocuidado",
    goals: [
      { text: "Checar postura no foco", points: 50, team: "Todas as equipes" },
      { text: "Fazer pausa consciente", points: 25, team: "Equipe Mel" },
      { text: "Modo sem tela", points: 30, team: "Equipe Flor" },
    ],
  },
]

function AdminGoalGroup({ group }) {
  return (
    <section className="rounded-lg bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-cover" />
        <h2 className="text-base font-black text-[#87521f]">{group.title}</h2>
      </div>

      <div className="space-y-3">
        {group.goals.map((goal) => (
          <article
            key={goal.text}
            className="grid gap-3 rounded-md bg-[#f7f3e8] p-3 text-[12px] font-bold text-[#8a551f] sm:grid-cols-[1fr_auto_auto] sm:items-center"
          >
            <div>
              <strong className="block text-sm font-black text-[#6a431d]">{goal.text}</strong>
              <span>{goal.team}</span>
            </div>
            <span className="font-black text-[#d38a18]">+{goal.points}</span>
            <div className="flex gap-2">
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-sm bg-white text-[#8a551f]">
                <Icon className="h-4 w-4" name="edit" />
              </button>
              <button type="button" className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#8d5a27] text-white">
                <Icon className="h-4 w-4" name="trash" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AdminMetas({ activePage, onNavigate }) {
  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid content-start gap-3">
          <header className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <img src={plantinhaImg} alt="" className="h-20 w-20 object-cover" />
              <div>
                <h1 className="text-3xl font-black text-[#9a5a1e]">Metas do administrador</h1>
                <p className="mt-1 text-sm font-bold text-[#658a30]">
                  O adm adiciona, edita e deleta as metas que aparecem para os usuarios.
                </p>
              </div>
            </div>
          </header>

          <div className="grid gap-3 xl:grid-cols-2">
            {goalGroups.map((group) => (
              <AdminGoalGroup key={group.title} group={group} />
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-3">
          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#87521f]">
              <Icon className="h-6 w-6 text-[#a36922]" name="plus" />
              Nova meta
            </div>

            <form className="mt-4 grid gap-3">
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Titulo
                <input
                  readOnly
                  value="Beber agua antes do foco"
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Equipe
                <input
                  readOnly
                  value="Todas as equipes"
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <label className="text-[12px] font-black text-[#8c9b3b]">
                Pontos
                <input
                  readOnly
                  value="+50"
                  className="mt-1 h-9 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                />
              </label>
              <button
                type="button"
                className="mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-sm bg-[#b3c843] px-4 text-[12px] font-black text-[#795719]"
              >
                Enviar meta
                <Icon className="h-4 w-4" name="plus" />
              </button>
            </form>
          </section>

          <section className="rounded-lg bg-[#fbe7c6] p-5 text-center shadow-sm">
            <img src={mascoteAlmofadaImg} alt="" className="mx-auto h-28 w-28 object-cover" />
            <h2 className="mt-2 text-base font-black text-[#8a551f]">Somente o adm edita</h2>
            <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
              A tela do usuario apenas exibe e marca as metas. Os controles de editar e deletar ficam aqui.
            </p>
          </section>
        </aside>
      </section>
    </AdminFrame>
  )
}

export default AdminMetas
