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
}

function Perfil({ activePage, onNavigate }) {
  const [profile, setProfile] = useState(emptyProfile)
  const [formData, setFormData] = useState(emptyProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isPhotoSaving, setIsPhotoSaving] = useState(false)
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

  function handleCancel() {
    setFormData(profile)
    setIsEditing(false)
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
      }

      setProfile(nextProfile)
      setFormData(nextProfile)
      setIsEditing(false)
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
                <input
                  className="h-8 w-full rounded-sm bg-white px-3 text-[12px] font-bold text-[#8a551f] outline-none disabled:opacity-80"
                  disabled={!isEditing || isLoading || isSaving}
                  id={field.name}
                  name={field.name}
                  onChange={handleChange}
                  required={field.required}
                  type={field.type}
                  value={formData[field.name]}
                />
              </div>
            ))}

            {message && <p className="text-[12px] font-bold text-[#8a551f]">{message}</p>}

            <div className="flex flex-wrap justify-end gap-3 pt-2">
              {isEditing && (
                <button
                  className="h-8 rounded-sm bg-[#fbe7c6] px-6 text-[12px] font-black text-[#8a551f]"
                  disabled={isSaving}
                  onClick={handleCancel}
                  type="button"
                >
                  Cancelar
                </button>
              )}
              <button
                className="h-8 rounded-sm bg-[#b2c43f] px-6 text-[12px] font-black text-[#8a551f] disabled:opacity-70"
                disabled={isLoading || isSaving}
                onClick={() => {
                  if (!isEditing) setIsEditing(true)
                }}
                type={isEditing ? "submit" : "button"}
              >
                {isSaving ? "Salvando..." : isEditing ? "Salvar" : "Editar"}
              </button>
            </div>
          </form>
        </section>
      </section>
    </AppFrame>
  )
}

export default Perfil
