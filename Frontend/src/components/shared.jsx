import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import logoImg from "../public/slothBeeLogo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import florzinha from "../public/slothBeeFlorzinha.png"

const menuItems = [
  { icon: "home", label: "inicio", page: "inicio" },
  { icon: "profile", label: "Perfil", page: "perfil" },
  { icon: "goals", label: "Metas", page: "metas" },
  { icon: "blog", label: "Blog", page: "blog" },
  { icon: "team", label: "Equipe", page: "equipe" },
]

export function Icon({ name, className = "" }) {
  const icons = {
    home: (
      <path d="M8 2.4 2.5 6.8v6.7h3.4V9.7h4.2v3.8h3.4V6.8L8 2.4Zm0-1.3 6.8 5.4-.6.8-.7-.6v7.8H9.1v-3.8H6.9v3.8H2.5V6.7l-.7.6-.6-.8L8 1.1Z" />
    ),
    profile: (
      <path d="M8 8.1a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Zm0-1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm0 1.9c-3.4 0-5.9 1.8-5.9 4.1v.6h11.8v-.6C13.9 10.8 11.4 9 8 9Zm-4.8 3.7c.3-1.6 2.2-2.7 4.8-2.7s4.5 1.1 4.8 2.7H3.2Z" />
    ),
    goals: (
      <path d="M2.2 3.1h11.6v1H2.2v-1Zm0 4.4h11.6v1H2.2v-1Zm0 4.4h11.6v1H2.2v-1ZM1 2h2.8v3.2H1V2Zm1 1v1.2h.8V3H2Zm-1 3.4h2.8v3.2H1V6.4Zm1 1v1.2h.8V7.4H2Zm-1 3.4h2.8V14H1v-3.2Zm1 1V13h.8v-1.2H2Z" />
    ),
    blog: (
      <path d="M2 2.2h12v11.6H2V2.2Zm1 1v9.6h10V3.2H3Zm1.5 2h7v1h-7v-1Zm0 2.4h7v1h-7v-1Zm0 2.4h4.8v1H4.5v-1Z" />
    ),
    play: <path d="M5.4 3.4 12.3 8l-6.9 4.6V3.4Z" />,
    timer: (
      <path d="M6.8 1h2.4v1H8.5v1.1a5 5 0 1 1-1 0V2H6.8V1Zm1.2 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm.5 1.7v2.1l1.4 1.4-.7.7-1.7-1.7V5.7h1ZM12 3l.7-.7 1.1 1.1-.7.7L12 3Z" />
    ),
    close: (
      <path d="M3.4 2.3 8 6.9l4.6-4.6 1.1 1.1L9.1 8l4.6 4.6-1.1 1.1L8 9.1l-4.6 4.6-1.1-1.1L6.9 8 2.3 3.4l1.1-1.1Z" />
    ),
    edit: (
      <path d="M11.9 1.5 14.5 4l-7.8 7.8-3.2.7.7-3.2 7.7-7.8Zm-.7 2.1L5.1 9.7 4.8 11l1.3-.3 6.1-6.1-1-1ZM2 13.3h12v1.2H2v-1.2Z" />
    ),
    team: (
      <path d="M6.2 1.8h3.6l1.8 3.1-1.8 3.1H6.2L4.4 4.9l1.8-3.1Zm.7 1.2-1.1 1.9 1.1 1.9h2.2l1.1-1.9L9.1 3H6.9ZM2.8 8.5h3l1.5 2.6-1.5 2.6h-3l-1.5-2.6 1.5-2.6Zm6.9 0h3l1.5 2.6-1.5 2.6h-3l-1.5-2.6 1.5-2.6Z" />
    ),
  }

  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

export function Logo({ className = "" }) {
  return (
    <div className={`h-10 w-28 overflow-hidden ${className}`}>
      <img src={logoImg} alt="SlothBee" className="h-45 w-50 -translate-y-16 scale-150 object-cover" />
    </div>
  )
}

export function HoneyPoints({ value, compact = false, variant = "default" }) {
  let cardStyles = "p-4"
  if (compact) cardStyles = "p-3"
  if (variant === "tall") cardStyles = "h-full w-full py-5 px-7"
  const bgStyles = variant === "tall" ? "bg-[#fbe7c6]" : "bg-white"

  return (
    <section className={`rounded-lg ${bgStyles} ${cardStyles} shadow-sm transition-all`}>
      <div className="flex items-center justify-center gap-3">
        <img src={florzinha} alt="Florzinha" className="h-10 w-10 object-cover" />
        <div className="text-center leading-tight">
          <strong className="block text-base font-black text-[#2f261d]">{value}</strong>
          <span className="text-[10px] font-bold text-[#8a551f]">Pontos de Mel</span>
        </div>
      </div>
    </section>
  )
}

export function ProgressBar({ left, right }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-[#e8dec6]">
      <div className="flex h-full">
        <span className="bg-[#f2b52f]" style={{ width: left }} />
        <span className="bg-[#91ad35]" style={{ width: right }} />
      </div>
    </div>
  )
}

export function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="flex flex-col bg-white px-5 py-5 rounded-none lg:min-h-screen">
      <Logo />
      <p className="mt-3 max-w-[150px] text-[13px] font-bold leading-tight text-[#658a30]">
        Foque, descanse, seja sua melhor versão!
      </p>

      <nav className="mt-8 flex flex-wrap gap-3 lg:block lg:space-y-3">
        {menuItems.map((item) => {
          const isActive = activePage === item.page
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`flex h-8 min-w-32 items-center gap-2 rounded-lg px-3 text-left text-[14px] font-bold transition-colors lg:w-full ${
                isActive ? "bg-[#f2f1ef] text-[#8b4f1e]" : "text-[#765126] hover:bg-[#fcfbf9]"
              }`}
            >
              {item.icon === "team" ? (
                <img src={colmeiaSimboloImg} alt="" className="h-5 w-5 object-contain" />
              ) : (
                <Icon className="h-5 w-5 text-[#a36922]" name={item.icon} />
              )}
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-4 h-px bg-[#ded1ab]" />

      <div className="mt-6 rounded-lg bg-[#f5f4f3] p-2.5 lg:mt-auto">
        <div className="flex items-center gap-2">
          <img src={mascoteAlmofadaImg} alt="Mascote SlothBee" className="h-15 w-15 rounded-md object-contain" />
          <p className="text-[12px] font-bold leading-tight text-[#8a551f]">
            Você está fazendo um ótimo trabalho, lembre-se de beber água.
          </p>
        </div>
      </div>
    </aside>
  )
}

export function AppFrame({ activePage, onNavigate, children, rightColumn }) {
  return (
    <main className="min-h-screen bg-[#e9e9e9] p-2 font-sans text-[#5c3717] lg:pl-0 lg:py-2 lg:pr-2">
      {/* Ajustamos o gap e o alinhamento da grid principal */}
      <div className="grid w-full gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-cols-[220px_minmax(0,1fr)_220px] xl:grid-cols-[260px_minmax(0,1fr)_250px]">
        <Sidebar activePage={activePage} onNavigate={onNavigate} />
        {children}
        {rightColumn}
      </div>
    </main>
  )
}
