import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { AppFrame, HoneyPoints, Icon } from "./shared.jsx"

const profileFields = [
  { label: "Nome", value: "Maria Eduarda de Barros" },
  { label: "Email", value: "maria_eduarda_barros@gmail.com" },
  { label: "Telefone", value: "(48) 99932 - 50003" },
  { label: "Cargo", value: "Programadora Full-Stack" },
  { label: "Senha", value: "***************" },
]

function Perfil({ activePage, onNavigate }) {
  return (
    <AppFrame
      activePage={activePage}
      onNavigate={onNavigate}
      rightColumn={
        <aside className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[minmax(160px,1fr)_auto_auto_auto]">
          <section className="relative overflow-hidden rounded-lg bg-white shadow-sm">
            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="absolute bottom-[-18px] left-1/2 h-[210px] w-[230px] -translate-x-1/2 object-contain"
            />
          </section>

          <section className="rounded-lg bg-[#fbe7c6] px-5 py-5 shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <Icon className="h-10 w-10 text-[#b2761d]" name="timer" />
              <div className="text-center leading-tight">
                <strong className="block text-base font-black text-[#2f261d]">2h 14min</strong>
                <span className="text-[10px] font-bold text-[#8a551f]">Foco de hoje</span>
              </div>
            </div>
          </section>

          <section className="rounded-lg bg-[#fbe7c6] px-5 py-5 shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#e84b4b] text-xl font-black text-[#e84b4b]">
                ◉
              </span>
              <div className="text-center leading-tight">
                <strong className="block text-base font-black text-[#2f261d]">17</strong>
                <span className="text-[10px] font-bold text-[#8a551f]">Metas cumpridas</span>
              </div>
            </div>
          </section>

          <HoneyPoints value="250" variant="tall" />
        </aside>
      }
    >
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[auto_1fr]">
        <section className="rounded-lg bg-white px-6 py-8 shadow-sm">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
            <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-full bg-[#d3d3d3]">
              <img
                src={mascoteAlmofadaImg}
                alt="Foto de perfil"
                className="h-full w-full scale-125 object-contain grayscale"
              />
              <span className="absolute bottom-4 right-7 h-6 w-6 rounded-full bg-[#9fb735]" />
            </div>

            <div className="pt-3">
              <h1 className="text-xl font-black text-[#a46522]">Maria Eduarda</h1>
              <p className="mt-1 text-sm font-black text-[#8a551f]">Exploradora do Foco</p>
              <p className="mt-4 text-[12px] font-black text-[#8a551f]">"Foco e descanso no tempo certo."</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button className="rounded-sm bg-[#fbe7c6] px-5 py-2 text-[12px] font-black text-[#a46522]">
                  Remover foto
                </button>
                <button className="rounded-sm bg-[#fbe7c6] px-5 py-2 text-[12px] font-black text-[#a46522]">
                  Alterar foto
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-[#f4f4f4] px-5 py-5 shadow-sm">
          <div className="space-y-3">
            {profileFields.map((field) => (
              <div key={field.label}>
                <label className="mb-1 block text-[12px] font-black text-[#8c9b3b]">{field.label}</label>
                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
                  <input
                    readOnly
                    value={field.value}
                    className="h-8 rounded-sm bg-white px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                  />
                  <button className="h-8 rounded-sm bg-[#b2c43f] px-6 text-[12px] font-black text-[#8a551f]">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </AppFrame>
  )
}

export default Perfil
