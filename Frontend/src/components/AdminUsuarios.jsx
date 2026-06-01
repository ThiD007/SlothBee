import { useEffect, useMemo, useState } from "react"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import mascoteImg from "../public/slothBeeMascote.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import { API_URL, getUsers } from "../services/auth.js"
import { AdminFrame, HoneyPoints, Icon } from "./shared.jsx"

const demoUsers = [
  {
    id: 1,
    nome: "Maria Eduarda",
    email: "maria@slothbee.com",
    telefone: "(11) 99999-1010",
    cargo: "Designer",
    pontos_mel: 520,
    foto_perfil: "",
  },
  {
    id: 2,
    nome: "Joao Pedro",
    email: "joao@slothbee.com",
    telefone: "(11) 98888-2020",
    cargo: "Desenvolvedor",
    pontos_mel: 460,
    foto_perfil: "",
  },
  {
    id: 3,
    nome: "Ana Clara",
    email: "ana@slothbee.com",
    telefone: "(11) 97777-3030",
    cargo: "Marketing",
    pontos_mel: 390,
    foto_perfil: "",
  },
]

function getPhotoSrc(fotoPerfil) {
  if (!fotoPerfil) return mascoteAlmofadaImg
  if (fotoPerfil.startsWith("http")) return fotoPerfil
  return `${API_URL}${fotoPerfil}`
}

function getInitials(name = "") {
  const initials = name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")

  return initials || "SB"
}

function UserAvatar({ user, size = "md" }) {
  const hasPhoto = Boolean(user.foto_perfil)
  const sizeClass = size === "lg" ? "h-28 w-28 text-3xl" : "h-14 w-14 text-base"

  return (
    <div className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#fbe7c6] font-black text-[#8a551f] ${sizeClass}`}>
      {hasPhoto ? (
        <img src={getPhotoSrc(user.foto_perfil)} alt="" className="h-full w-full object-cover" />
      ) : (
        <span>{getInitials(user.nome)}</span>
      )}
    </div>
  )
}

function UserModal({ user, onClose }) {
  if (!user) return null

  const details = [
    { label: "Nome", value: user.nome || "Sem nome" },
    { label: "Email", value: user.email || "Nao informado" },
    { label: "Telefone", value: user.telefone || "Nao informado" },
    { label: "Cargo", value: user.cargo || "Nao informado" },
    { label: "Pontos de mel", value: user.pontos_mel ?? 0 },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="relative w-full max-w-[560px] rounded-lg bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-sm bg-[#f7f3e8] text-[#8a551f]"
          aria-label="Fechar informacoes do usuario"
        >
          <Icon className="h-5 w-5" name="close" />
        </button>

        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <UserAvatar user={user} size="lg" />
          <div className="min-w-0">
            <p className="text-[12px] font-black uppercase text-[#8c9b3b]">Usuario selecionado</p>
            <h2 className="mt-1 text-2xl font-black text-[#9a5a1e]">{user.nome || "Usuario"}</h2>
            <p className="mt-1 text-sm font-bold text-[#765126]">{user.cargo || "Cargo nao informado"}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {details.map((item) => (
            <div key={item.label} className="rounded-md bg-[#f7f3e8] p-3">
              <p className="text-[11px] font-black uppercase text-[#8c9b3b]">{item.label}</p>
              <strong className="mt-1 block break-words text-sm font-black text-[#5c3717]">{item.value}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function AdminUsuarios({ activePage, onNavigate, theme, onToggleTheme }) {
  const [users, setUsers] = useState(demoUsers)
  const [selectedUser, setSelectedUser] = useState(null)
  const [search, setSearch] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadUsers() {
      const accessToken = localStorage.getItem("accessToken")

      if (!accessToken) {
        setMessage("Mostrando usuarios de exemplo. Faca login para carregar os usuarios cadastrados.")
        setIsLoading(false)
        return
      }

      try {
        setMessage("")
        setIsLoading(true)
        const data = await getUsers(accessToken)
        if (!ignore && Array.isArray(data.users) && data.users.length > 0) {
          setUsers(data.users)
        }
      } catch (error) {
        if (!ignore) setMessage(`${error.message}. Mostrando usuarios de exemplo.`)
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    loadUsers()

    return () => {
      ignore = true
    }
  }, [])

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    if (!normalizedSearch) return users

    return users.filter((user) =>
      [user.nome, user.email, user.telefone, user.cargo].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(normalizedSearch)
      )
    )
  }, [search, users])

  const totalPoints = users.reduce((sum, user) => sum + Number(user.pontos_mel || 0), 0)

  return (
    <AdminFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      <section className="grid gap-3 lg:min-h-[calc(100vh-1rem)] xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="grid content-start gap-3">
          <header className="grid gap-4 rounded-lg bg-white p-5 shadow-sm sm:grid-cols-[auto_1fr] sm:items-center">
            <img src={mascoteImg} alt="" className="h-20 w-20 object-cover" />
            <div>
              <h1 className="text-3xl font-black text-[#9a5a1e]">Usuarios</h1>
              <p className="mt-1 text-sm font-bold text-[#658a30]">
                Clique em um usuario para abrir as informacoes em um pop-up.
              </p>
            </div>
          </header>

          <section className="rounded-lg bg-white p-5 shadow-sm">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <label className="block text-[12px] font-black text-[#8c9b3b]">
                Buscar usuario
                <input
                  className="mt-1 h-10 w-full rounded-sm bg-[#f7f3e8] px-3 text-[12px] font-bold text-[#8a551f] outline-none"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Nome, email, telefone ou cargo"
                  value={search}
                />
              </label>
              <span className="rounded-md bg-[#fbe7c6] px-4 py-3 text-center text-[12px] font-black text-[#8a551f]">
                {filteredUsers.length} usuarios
              </span>
            </div>

            {message && <p className="mt-3 text-[12px] font-bold text-[#8a551f]">{message}</p>}
            {isLoading && <p className="mt-3 text-[12px] font-bold text-[#8a551f]">Carregando usuarios...</p>}

            <div className="mt-5 grid gap-3">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => setSelectedUser(user)}
                  className="grid gap-3 rounded-lg bg-[#f7f3e8] p-4 text-left shadow-sm transition-transform hover:-translate-y-0.5 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <UserAvatar user={user} />
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-black text-[#5c3717]">{user.nome || "Usuario"}</h2>
                    <p className="mt-1 truncate text-[12px] font-bold text-[#765126]">{user.email || "Email nao informado"}</p>
                    <span className="mt-2 inline-flex rounded-full bg-[#edf4d8] px-3 py-1 text-[11px] font-black text-[#638330]">
                      {user.cargo || "Sem cargo"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:grid sm:text-right">
                    <strong className="text-lg font-black text-[#d38a18]">{user.pontos_mel ?? 0}</strong>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-white text-[#8a551f]">
                      <Icon className="h-5 w-5" name="arrowRight" />
                    </span>
                  </div>
                </button>
              ))}

              {filteredUsers.length === 0 && (
                <p className="rounded-lg bg-[#f7f3e8] p-4 text-[12px] font-bold text-[#8a551f]">
                  Nenhum usuario encontrado.
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className="grid content-start gap-3">
          <HoneyPoints value={totalPoints} label="Pontos dos usuarios" compact />

          <section className="rounded-lg bg-white p-5 text-center shadow-sm">
            <img src={colmeiaSimboloImg} alt="" className="mx-auto h-16 w-16 object-cover" />
            <h2 className="mt-2 text-lg font-black text-[#8a551f]">Resumo rapido</h2>
            <p className="mt-2 text-[12px] font-bold leading-snug text-[#765126]">
              O administrador pode visualizar contato, cargo e pontos de cada usuario sem sair desta pagina.
            </p>
          </section>

          <section className="rounded-lg bg-[#fbe7c6] p-5 shadow-sm">
            <div className="flex items-center gap-2 text-base font-black text-[#8a551f]">
              <Icon className="h-6 w-6" name="users" />
              Dados no pop-up
            </div>
            <p className="mt-3 text-[12px] font-bold leading-snug text-[#765126]">
              Clique em qualquer usuario da lista para abrir as informacoes completas em uma janela.
            </p>
          </section>
        </aside>

        <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      </section>
    </AdminFrame>
  )
}

export default AdminUsuarios
