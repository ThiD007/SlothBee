import { useEffect, useMemo, useRef, useState } from "react"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import {
  API_URL,
  deleteProfilePhoto,
  getCurrentUser,
  updateCurrentUser,
  updateProfilePhoto,
} from "../services/auth.js"
import { AppFrame, HoneyPoints, Icon } from "./shared.jsx"

const emptyProfile = {
  nome: "",
  email: "",
  telefone: "",
  cargo: "",
  foto_perfil: "",
  senha: "",
}

function Perfil({ activePage, onNavigate, theme, onToggleTheme }) {
  const [profile, setProfile] = useState(emptyProfile)
  const [formData, setFormData] = useState(emptyProfile)
  const [editingField, setEditingField] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPhotoSaving, setIsPhotoSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState("")
  const fileInputRef = useRef(null)

  const accessToken = useMemo(() => localStorage.getItem("accessToken"), [])

  useEffect(() => {
    async function loadProfile() {
      if (!accessToken) {
        onNavigate("landing")
        return
      }

      try {
        setIsLoading(true)
        setMessage("")
        const user = await getCurrentUser(accessToken)
        const nextProfile = {
          nome: user.nome || "",
          email: user.email || "",
          telefone: user.telefone || "",
          cargo: user.cargo || "",
          foto_perfil: user.foto_perfil || "",
          senha: "",
        }

        setProfile(nextProfile)
        setFormData(nextProfile)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [accessToken, onNavigate])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handleEditField(fieldName) {
    setEditingField(fieldName)
    if (fieldName === "senha") {
      setFormData((current) => ({ ...current, senha: "" }))
      setShowPassword(false)
    }
    setMessage("")
  }

  function handleCancelField(fieldName) {
    setFormData((current) => ({ ...current, [fieldName]: profile[fieldName] }))
    if (fieldName === "senha") setShowPassword(false)
    setEditingField(null)
    setMessage("")
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setMessage("")
      const updatedUser = await updateCurrentUser(accessToken, formData)
      const nextProfile = {
        nome: updatedUser.nome || "",
        email: updatedUser.email || "",
        telefone: updatedUser.telefone || "",
        cargo: updatedUser.cargo || "",
        foto_perfil: updatedUser.foto_perfil || "",
        senha: "",
      }

      setProfile(nextProfile)
      setFormData(nextProfile)
      setEditingField(null)
      setShowPassword(false)
      setMessage("Perfil atualizado com sucesso.")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const profileFields = [
    { label: "Nome", name: "nome", type: "text", required: true },
    { label: "Email", name: "email", type: "email", required: true },
    { label: "Telefone", name: "telefone", type: "tel" },
    { label: "Cargo", name: "cargo", type: "text" },
    { label: "Senha", name: "senha", type: "password" },
  ]

  function getPhotoSrc(fotoPerfil) {
    if (!fotoPerfil) return mascoteAlmofadaImg
    if (fotoPerfil.startsWith("http")) return fotoPerfil
    return `${API_URL}${fotoPerfil}`
  }

  async function handlePhotoChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsPhotoSaving(true)
      setMessage("")
      const updatedUser = await updateProfilePhoto(accessToken, file)
      const nextProfile = {
        ...profile,
        foto_perfil: updatedUser.foto_perfil || "",
      }

      setProfile(nextProfile)
      setFormData((current) => ({ ...current, foto_perfil: nextProfile.foto_perfil }))
      setMessage("Foto atualizada com sucesso.")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsPhotoSaving(false)
      event.target.value = ""
    }
  }

  async function handleRemovePhoto() {
    try {
      setIsPhotoSaving(true)
      setMessage("")
      const updatedUser = await deleteProfilePhoto(accessToken)
      const nextProfile = {
        ...profile,
        foto_perfil: updatedUser.foto_perfil || "",
      }

      setProfile(nextProfile)
      setFormData((current) => ({ ...current, foto_perfil: nextProfile.foto_perfil }))
      setMessage("Foto removida com sucesso.")
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsPhotoSaving(false)
    }
  }

  return (
    <AppFrame
      activePage={activePage}
      onNavigate={onNavigate}
      theme={theme}
      onToggleTheme={onToggleTheme}
      rightColumn={
        <aside className="grid gap-3 lg:min-h-[calc(100vh-1rem)] lg:grid-rows-[minmax(160px,1fr)_auto_auto_auto]">
          <section className="relative overflow-hidden rounded-lg bg-white shadow-sm">
            <img
              src={plantinhaImg}
              alt="Mascote SlothBee"
              className="absolute bottom-[-18px] left-1/2 h-[210px] w-[230px] -translate-x-1/2 object-cover"
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
                src={getPhotoSrc(profile.foto_perfil)}
                alt="Foto de perfil"
                className={`h-full w-full ${profile.foto_perfil ? "object-cover" : "scale-125 object-contain grayscale"}`}
              />
              <span className="absolute bottom-4 right-7 h-6 w-6 rounded-full bg-[#9fb735]" />
            </div>

            <div className="pt-3">
              <h1 className="text-xl font-black text-[#a46522]">{profile.nome || "Meu perfil"}</h1>
              <p className="mt-1 text-sm font-black text-[#8a551f]">{profile.cargo || "Exploradora do Foco"}</p>
              <p className="mt-4 text-[12px] font-black text-[#8a551f]">"Foco e descanso no tempo certo."</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                  type="file"
                />
                <button
                  className="rounded-sm bg-[#fbe7c6] px-5 py-2 text-[12px] font-black text-[#a46522] disabled:opacity-70"
                  disabled={isPhotoSaving || !profile.foto_perfil}
                  onClick={handleRemovePhoto}
                  type="button"
                >
                  {isPhotoSaving ? "Aguarde..." : "Remover foto"}
                </button>
                <button
                  className="rounded-sm bg-[#fbe7c6] px-5 py-2 text-[12px] font-black text-[#a46522] disabled:opacity-70"
                  disabled={isPhotoSaving}
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  {isPhotoSaving ? "Enviando..." : profile.foto_perfil ? "Alterar foto" : "Adicionar foto"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-[#f4f4f4] px-5 py-5 shadow-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            {profileFields.map((field) => (
              <div key={field.name}>
                <label className="mb-1 block text-[12px] font-black text-[#8c9b3b]" htmlFor={field.name}>
                  {field.label}
                </label>
                <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
                  <div className="relative">
                    <input
                      className={`h-8 w-full rounded-sm bg-white px-3 text-[12px] font-bold text-[#8a551f] outline-none disabled:opacity-80 ${
                        field.name === "senha" && editingField === field.name ? "pr-10" : ""
                      }`}
                      disabled={editingField !== field.name || isLoading || isSaving}
                      id={field.name}
                      name={field.name}
                      onChange={handleChange}
                      placeholder={field.name === "senha" && editingField === field.name ? "Digite a nova senha" : ""}
                      required={field.required || editingField === "senha"}
                      type={field.name === "senha" && showPassword ? "text" : field.type}
                      value={field.name === "senha" && editingField !== field.name ? "***" : formData[field.name]}
                    />
                    {field.name === "senha" && editingField === field.name && (
                      <button
                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-sm text-[#a46522] hover:bg-[#fbe7c6]"
                        onClick={() => setShowPassword((current) => !current)}
                        title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                        type="button"
                      >
                        <Icon className="h-4 w-4" name={showPassword ? "eyeOff" : "eye"} />
                      </button>
                    )}
                  </div>

                  {editingField === field.name ? (
                    <div className="grid grid-cols-2 gap-2 sm:flex">
                      <button
                        className="h-8 rounded-sm bg-[#fbe7c6] px-4 text-[12px] font-black text-[#8a551f] disabled:opacity-70"
                        disabled={isSaving}
                        onClick={() => handleCancelField(field.name)}
                        type="button"
                      >
                        Cancelar
                      </button>
                      <button
                        className="h-8 rounded-sm bg-[#b2c43f] px-4 text-[12px] font-black text-[#8a551f] disabled:opacity-70"
                        disabled={isSaving}
                        type="submit"
                      >
                        {isSaving ? "Salvando..." : "Salvar"}
                      </button>
                    </div>
                  ) : (
                    <button
                      className="h-8 rounded-sm bg-[#fbe7c6] px-4 text-[12px] font-black text-[#a46522] disabled:opacity-70"
                      disabled={isLoading || isSaving || Boolean(editingField)}
                      onClick={() => handleEditField(field.name)}
                      type="button"
                    >
                      Editar
                    </button>
                  )}
                </div>
              </div>
            ))}

            {message && <p className="text-[12px] font-bold text-[#8a551f]">{message}</p>}
          </form>
        </section>
      </section>
    </AppFrame>
  )
}

export default Perfil
