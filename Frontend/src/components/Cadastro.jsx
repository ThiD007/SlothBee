import { Icon } from "./shared.jsx"

function Cadastro({ onClose, onBackToLogin, onCreate }) {
  function handleSubmit(event) {
    event.preventDefault()
    onCreate()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-[520px] rounded-2xl bg-white px-7 pb-7 pt-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-7 top-5 flex h-9 w-9 items-center justify-center text-black"
          aria-label="Fechar cadastro"
        >
          <Icon className="h-8 w-8" name="close" />
        </button>

        <h1 className="text-center text-3xl font-black text-[#9a5a1e]">Cadastro</h1>

        <label className="mt-5 block text-sm font-bold text-[#9a5a1e]" htmlFor="name">
          Nome:
        </label>
        <input
          id="name"
          type="text"
          className="mt-1 h-11 w-full rounded-full border border-[#d7b78a] bg-[#fffdf9] px-4 text-[#5c3717] outline-none"
        />

        <label className="mt-4 block text-sm font-bold text-[#9a5a1e]" htmlFor="register-email">
          E-mail:
        </label>
        <input
          id="register-email"
          type="email"
          className="mt-1 h-11 w-full rounded-full border border-[#d7b78a] bg-[#fffdf9] px-4 text-[#5c3717] outline-none"
        />

        <label className="mt-4 block text-sm font-bold text-[#9a5a1e]" htmlFor="register-password">
          Senha:
        </label>
        <input
          id="register-password"
          type="password"
          className="mt-1 h-11 w-full rounded-full border border-[#d7b78a] bg-[#fffdf9] px-4 text-[#5c3717] outline-none"
        />

        <div className="mt-7 flex items-center justify-end gap-3">
          <button type="button" onClick={onBackToLogin} className="text-lg font-black text-[#9a5a1e]">
            Login
          </button>
          <button type="submit" className="rounded-full bg-[#fbe7c6] px-6 py-3 text-lg font-black text-[#9a5a1e]">
            Criar conta
          </button>
        </div>
      </form>
    </div>
  )
}

export default Cadastro
