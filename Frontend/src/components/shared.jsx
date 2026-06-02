import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import logoImg from "../public/slothBeeLogo.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import florzinha from "../public/slothBeeFlorzinha.png"

const menuItems = [
  { icon: "home", label: "inicio", page: "inicio" },
  { icon: "profile", label: "Perfil", page: "perfil" },
  { icon: "goals", label: "Metas", page: "metas" },
  { icon: "blog", label: "Blog", page: "blog" },
  { icon: "star", label: "Favoritos", page: "favoritos" },
  { icon: "logout", label: "Sair", page: "logout" },
]

const adminMenuItems = [
  { icon: "home", label: "Inicio", page: "admin-inicio" },
  { icon: "team", label: "Equipes", page: "admin-equipes" },
  { icon: "users", label: "Usuarios", page: "admin-usuarios" },
  { icon: "chart", label: "Grafico", page: "admin-grafico" },
  { icon: "goals", label: "Metas", page: "admin-metas" },
  { icon: "blog", label: "Blog", page: "admin-blog" },
  { icon: "logout", label: "Sair", page: "logout" },
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
    star: (
      <path d="m8 1.6 1.8 3.7 4.1.6-3 2.9.7 4.1L8 11l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.6Zm0 2.6-1 2.1-2.3.3 1.7 1.6-.4 2.3 2-1.1 2 1.1-.4-2.3 1.7-1.6-2.3-.3-1-2.1Z" />
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
    eye: (
      <path d="M8 3.2c3 0 5.3 2 6.4 4.8C13.3 10.8 11 12.8 8 12.8S2.7 10.8 1.6 8C2.7 5.2 5 3.2 8 3.2Zm0 1.1C5.7 4.3 3.8 5.7 2.8 8c1 2.3 2.9 3.7 5.2 3.7s4.2-1.4 5.2-3.7c-1-2.3-2.9-3.7-5.2-3.7Zm0 1.5A2.2 2.2 0 1 1 8 10.2 2.2 2.2 0 0 1 8 5.8Zm0 1.1A1.1 1.1 0 1 0 8 9.1 1.1 1.1 0 0 0 8 6.9Z" />
    ),
    eyeOff: (
      <path d="M2.8 1.9 14.1 13.2l-.8.8-2.1-2.1c-.9.5-2 .9-3.2.9-3 0-5.3-2-6.4-4.8.5-1.2 1.2-2.3 2.1-3.1L2 2.7l.8-.8Zm1.7 3.8A7.1 7.1 0 0 0 2.8 8c1 2.3 2.9 3.7 5.2 3.7.8 0 1.6-.2 2.3-.6L9 9.8a2.2 2.2 0 0 1-2.8-2.8L4.5 5.7Zm2.6 2.6.8.8H8A1.1 1.1 0 0 1 6.9 8v-.1l.2.4ZM8 3.2c3 0 5.3 2 6.4 4.8-.4 1-1 1.9-1.7 2.6l-.8-.8c.5-.5 1-1.1 1.3-1.8-1-2.3-2.9-3.7-5.2-3.7-.7 0-1.3.1-1.9.4l-.9-.9c.9-.4 1.8-.6 2.8-.6Zm0 2.6A2.2 2.2 0 0 1 10.2 8v.4L7.6 5.8H8Z" />
    ),
    team: (
      <path d="M6.2 1.8h3.6l1.8 3.1-1.8 3.1H6.2L4.4 4.9l1.8-3.1Zm.7 1.2-1.1 1.9 1.1 1.9h2.2l1.1-1.9L9.1 3H6.9ZM2.8 8.5h3l1.5 2.6-1.5 2.6h-3l-1.5-2.6 1.5-2.6Zm6.9 0h3l1.5 2.6-1.5 2.6h-3l-1.5-2.6 1.5-2.6Z" />
    ),
    users: (
      <path d="M5.6 7.2a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4Zm0-1.1a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Zm5.1 1a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Zm0-1.1a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2ZM5.6 8.1c-2.8 0-4.8 1.5-4.8 3.4v1.1h9.6v-1.1c0-1.9-2-3.4-4.8-3.4Zm-3.6 3.4c.1-1.2 1.6-2.3 3.6-2.3s3.5 1.1 3.6 2.3H2Zm8.8-3.2c-.5 0-1 .1-1.4.2.5.3.9.7 1.2 1.2h.2c1.6 0 2.8.8 2.9 1.8h-2.2v1.1H15v-1.1c0-1.8-1.8-3.2-4.2-3.2Z" />
    ),
    chart: (
      <path d="M2.2 13.2h11.6v1H2.2v-1Zm1.1-4.4h2.2v3.4H3.3V8.8Zm3.6-5.2h2.2v8.6H6.9V3.6Zm3.6 3.2h2.2v5.4h-2.2V6.8Z" />
    ),
    sun: (
      <path d="M7.5 1h1v2h-1V1Zm0 12h1v2h-1v-2ZM1 7.5h2v1H1v-1Zm12 0h2v1h-2v-1ZM3 2.3 4.4 3.7l-.7.7L2.3 3 3 2.3Zm9.3 9.3 1.4 1.4-.7.7-1.4-1.4.7-.7Zm.7-9.3.7.7-1.4 1.4-.7-.7L13 2.3ZM3.7 11.6l.7.7L3 13.7l-.7-.7 1.4-1.4ZM8 4.6A3.4 3.4 0 1 1 8 11.4 3.4 3.4 0 0 1 8 4.6Zm0 1.1A2.3 2.3 0 1 0 8 10.3 2.3 2.3 0 0 0 8 5.7Z" />
    ),
    moon: (
      <path d="M11.7 10.8A5.6 5.6 0 0 1 5.2 4.3 4.7 4.7 0 1 0 11.7 10.8ZM8.2 1.2a6 6 0 1 0 6.6 6.6A4.5 4.5 0 0 1 8.2 1.2Z" />
    ),
    plus: <path d="M7.4 2h1.2v5.4H14v1.2H8.6V14H7.4V8.6H2V7.4h5.4V2Z" />,
    trash: (
      <path d="M6.2 1.6h3.6l.5 1.2h3v1.1H2.7V2.8h3l.5-1.2Zm.7 1.2h2.2L8.9 2.6H7.1l-.2.2Zm-2.8 2h7.8l-.6 9.2H4.7l-.6-9.2Zm1.2 1 .4 7.1h4.6l.4-7.1H5.3Zm1.4 1.1h1v4.8h-1V6.9Zm1.6 0h1v4.8h-1V6.9Z" />
    ),
    arrowRight: <path d="M9.1 3.1 14 8l-4.9 4.9-.8-.8 3.6-3.6H2V7.4h9.9L8.3 3.9l.8-.8Z" />,
    arrowLeft: <path d="M6.9 3.1 2 8l4.9 4.9.8-.8-3.6-3.6H14V7.4H4.1l3.6-3.5-.8-.8Z" />,
    chat: (
      <path d="M3.1 3h9.8c.8 0 1.5.7 1.5 1.5v5.4c0 .8-.7 1.5-1.5 1.5H7.4L4 14v-2.6h-.9c-.8 0-1.5-.7-1.5-1.5V4.5C1.6 3.7 2.3 3 3.1 3Zm0 1.1a.4.4 0 0 0-.4.4v5.4c0 .2.2.4.4.4h2v1.4l1.9-1.4h5.9c.2 0 .4-.2.4-.4V4.5a.4.4 0 0 0-.4-.4H3.1Z" />
    ),
    logout: (
      <path d="M2.2 2.2h6v1.1h-4.9v9.4h4.9v1.1h-6V2.2Zm8.1 2.5 3.4 3.3-3.4 3.3-.8-.8 2-2H6.2V7.5h5.3l-2-2 .8-.8Z" />
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

export function HoneyPoints({ value, label = "Pontos de Mel", compact = false, variant = "default", className = "" }) {
  let cardStyles = "p-4"
  if (compact) cardStyles = "p-3"
  if (variant === "tall") cardStyles = "h-full w-full py-5 px-7"
  const bgStyles = variant === "tall" ? "bg-[#fbe7c6]" : "bg-white"

  return (
    <section className={`rounded-lg ${bgStyles} ${cardStyles} shadow-sm transition-all ${className}`}>
      <div className="flex items-center justify-center gap-3">
        <img src={florzinha} alt="Florzinha" className="h-10 w-10 object-cover" />
        <div className="text-center leading-tight">
          <strong className="block text-base font-black text-[#2f261d]">{value}</strong>
          <span className="text-[12px] font-bold text-[#8a551f]">{label}</span>
        </div>
      </div>
    </section>
  )
}

export function ThemeToggle({ theme = "light", onToggle, compact = false, className = "" }) {
  const isDark = theme === "dark"
  const label = isDark ? "Modo claro" : "Modo escuro"

  return (
    <button
      type="button"
      onClick={onToggle}
      className={`theme-toggle inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#fbe7c6] px-3 text-[12px] font-black text-[#8a551f] shadow-sm transition-colors ${className}`}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      aria-pressed={isDark}
    >
      <span className="flex h-6 w-11 items-center rounded-full bg-[#9a5a1e]/20 p-0.5">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#9a5a1e] shadow-sm transition-transform ${
            isDark ? "translate-x-5" : "translate-x-0"
          }`}
        >
          <Icon className="h-3.5 w-3.5" name={isDark ? "moon" : "sun"} />
        </span>
      </span>
      {!compact && <span>{label}</span>}
    </button>
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

export function Sidebar({ activePage, onNavigate, theme, onToggleTheme }) {
  return (
    <aside className="hidden flex-col rounded-none bg-white px-5 py-5 md:flex md:min-h-screen">
      <Logo />
      <p className="mt-3 max-w-[150px] text-[14px] font-bold leading-tight text-[#658a30]">
        Foque, descanse, seja sua melhor versão!
      </p>

      <ThemeToggle theme={theme} onToggle={onToggleTheme} className="mt-4 w-full" />

      <nav className="mt-8 flex flex-wrap gap-3 md:block md:space-y-3">
        {menuItems.map((item) => {
          const isActive = activePage === item.page
          const isLogout = item.page === "logout"
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`flex h-8 min-w-32 items-center gap-2 rounded-lg px-3 text-left text-[14px] font-bold transition-colors md:w-full ${
                isActive
                  ? "bg-[#f2f1ef] text-[#8b4f1e]"
                  : isLogout
                    ? "text-[#9b3d1d] hover:bg-[#fff4ee]"
                    : "text-[#765126] hover:bg-[#fcfbf9]"
              }`}
            >
              {item.icon === "team" ? (
                <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-cover" />
              ) : (
                <Icon className={`h-6 w-6 ${isLogout ? "text-[#b95b2d]" : "text-[#a36922]"}`} name={item.icon} />
              )}
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-4 h-px bg-[#ded1ab]" />

      <div className="mt-6 rounded-lg bg-[#f5f4f3] p-2.5 md:mt-auto">
        <div className="flex items-center gap-2">
          <img src={mascoteAlmofadaImg} alt="Mascote SlothBee" className="h-15 w-15 rounded-md object-cover" />
          <p className="text-[12px] font-extrabold leading-tight text-[#8a551f]">
            Você está fazendo um ótimo trabalho, lembre-se de beber água.
          </p>
        </div>
      </div>
    </aside>
  )
}

export function AdminSidebar({ activePage, onNavigate, theme, onToggleTheme }) {
  return (
    <aside className="hidden flex-col rounded-none bg-white px-5 py-5 md:flex md:min-h-screen">
      <Logo />
      <p className="mt-3 max-w-[150px] text-[14px] font-bold leading-tight text-[#658a30]">
        Painel visual para cuidar das equipes.
      </p>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} className="mt-4 w-full" />

      <nav className="mt-8 flex flex-wrap gap-3 md:block md:space-y-3">
        {adminMenuItems.map((item) => {
          const isActive = activePage === item.page
          const isLogout = item.page === "logout"
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onNavigate(item.page)}
              className={`flex h-8 min-w-32 items-center gap-2 rounded-lg px-3 text-left text-[14px] font-bold transition-colors md:w-full ${
                isActive
                  ? "bg-[#f2f1ef] text-[#8b4f1e]"
                  : isLogout
                    ? "text-[#9b3d1d] hover:bg-[#fff4ee]"
                    : "text-[#765126] hover:bg-[#fcfbf9]"
              }`}
            >
              {item.icon === "team" ? (
                <img src={colmeiaSimboloImg} alt="" className="h-7 w-7 object-cover" />
              ) : (
                <Icon className={`h-6 w-6 ${isLogout ? "text-[#b95b2d]" : "text-[#a36922]"}`} name={item.icon} />
              )}
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-4 h-px bg-[#ded1ab]" />

      <div className="mt-6 rounded-lg bg-[#f5f4f3] p-2.5 md:mt-auto">
        <div className="flex items-center gap-2">
          <img src={mascoteAlmofadaImg} alt="Mascote SlothBee" className="h-15 w-15 rounded-md object-cover" />
          <p className="text-[12px] font-extrabold leading-tight text-[#8a551f]">
            Area administrativa separada para metas, equipes e blog.
          </p>
        </div>
      </div>
    </aside>
  )
}

function MobileTopBar({ admin = false, theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-30 mb-2 flex items-center justify-between gap-3 rounded-b-lg bg-white px-4 py-3 shadow-sm md:hidden">
      <div className="min-w-0">
        <Logo />
        <p className="mt-1 text-[10px] font-black leading-tight text-[#658a30]">
          {admin ? "Painel visual do administrador." : "Foque, descanse, seja sua melhor versão!"}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} compact className="w-16 px-2" />
        {admin ? (
          <span className="rounded-lg bg-[#fbe7c6] px-3 py-2 text-center text-[11px] font-black text-[#8a551f]">
            Admin
          </span>
        ) : (
          <HoneyPoints value="250" compact className="px-2 py-2 [&_img]:h-7 [&_img]:w-7 [&_strong]:text-sm [&_span]:text-[10px]" />
        )}
      </div>
    </header>
  )
}

function MobileNav({ activePage, onNavigate, admin = false }) {
  const items = admin ? adminMenuItems : menuItems
  const gridClass = admin ? "grid-cols-3 sm:grid-cols-6" : "grid-cols-3 sm:grid-cols-6"

  return (
    <nav
      className={`fixed inset-x-0 bottom-0 z-40 grid ${gridClass} gap-1 border-t border-[#e4d6b7] bg-white px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-6px_18px_rgba(0,0,0,0.08)] md:hidden`}
    >
      {items.map((item) => {
        const isActive = activePage === item.page
        const isLogout = item.page === "logout"
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.page)}
            className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-md px-1 text-[10px] font-black leading-none ${
              isActive ? "bg-[#f2f1ef] text-[#8b4f1e]" : isLogout ? "text-[#9b3d1d]" : "text-[#765126]"
            }`}
          >
            {item.icon === "team" ? (
              <img src={colmeiaSimboloImg} alt="" className="h-5 w-5 object-cover" />
            ) : (
              <Icon className={`h-5 w-5 ${isLogout ? "text-[#b95b2d]" : "text-[#a36922]"}`} name={item.icon} />
            )}
            <span>{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function AppFrame({ activePage, onNavigate, children, rightColumn, bare = false, theme, onToggleTheme }) {
  if (bare) {
    return <main className="theme-scope min-h-screen bg-[#e9e9e9] p-2 font-sans text-[#5c3717]" data-theme={theme}>{children}</main>
  }

  return (
    <main className="theme-scope min-h-screen bg-[#e9e9e9] p-2 pb-24 font-sans text-[#5c3717] md:py-2 md:pl-0 md:pr-2 md:pb-2" data-theme={theme}>
      <MobileTopBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="grid w-full gap-3 md:min-h-[calc(100vh-1rem)] md:grid-cols-[220px_minmax(0,1fr)_220px] xl:grid-cols-[260px_minmax(0,1fr)_250px]">
        <Sidebar activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
        {children}
        {rightColumn}
      </div>
      <MobileNav activePage={activePage} onNavigate={onNavigate} />
    </main>
  )
}

export function AdminFrame({ activePage, onNavigate, children, theme, onToggleTheme }) {
  return (
    <main className="theme-scope min-h-screen bg-[#e9e9e9] p-2 pb-36 font-sans text-[#5c3717] md:py-2 md:pl-0 md:pr-2 md:pb-2" data-theme={theme}>
      <MobileTopBar admin theme={theme} onToggleTheme={onToggleTheme} />
      <div className="grid w-full gap-3 md:min-h-[calc(100vh-1rem)] md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)]">
        <AdminSidebar activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
        {children}
      </div>
      <MobileNav activePage={activePage} onNavigate={onNavigate} admin />
    </main>
  )
}
