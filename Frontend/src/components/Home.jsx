import { useState } from "react"
import { login, register } from "../services/auth.js"
import Blog from "./Blog.jsx"
import Cadastro from "./Cadastro.jsx"
import Inicio from "./inicio.jsx"
import LandingPage from "./LandingPage.jsx"
import Login from "./Login.jsx"
import Metas from "./Metas.jsx"
import Perfil from "./Perfil.jsx"

function Home() {
  const [activePage, setActivePage] = useState(() =>
    localStorage.getItem("accessToken") ? "inicio" : "landing",
  )
  const [authModal, setAuthModal] = useState(null)
  const [authMessage, setAuthMessage] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  function openAuthModal(modal) {
    setAuthMessage("")
    setAuthModal(modal)
  }

  async function handleLogin(credentials) {
    try {
      setIsAuthLoading(true)
      setAuthMessage("")
      const data = await login(credentials)
      localStorage.setItem("accessToken", data.accessToken)
      setAuthModal(null)
      setActivePage("inicio")
    } catch (error) {
      setAuthMessage(error.message)
    } finally {
      setIsAuthLoading(false)
    }
  }

  async function handleRegister(userData) {
    try {
      setIsAuthLoading(true)
      setAuthMessage("")
      await register(userData)
      const data = await login({
        email: userData.email,
        senha: userData.senha,
      })
      localStorage.setItem("accessToken", data.accessToken)
      setAuthModal(null)
      setActivePage("inicio")
    } catch (error) {
      setAuthMessage(error.message)
    } finally {
      setIsAuthLoading(false)
    }
  }

  if (activePage === "landing") {
    return (
      <>
        <LandingPage onOpenLogin={() => openAuthModal("login")} />

        {authModal === "login" && (
          <Login
            onClose={() => setAuthModal(null)}
            onLogin={handleLogin}
            onOpenCadastro={() => openAuthModal("cadastro")}
            isLoading={isAuthLoading}
            message={authMessage}
          />
        )}

        {authModal === "cadastro" && (
          <Cadastro
            onClose={() => setAuthModal(null)}
            onBackToLogin={() => openAuthModal("login")}
            onCreate={handleRegister}
            isLoading={isAuthLoading}
            message={authMessage}
          />
        )}
      </>
    )
  }

  const pageProps = {
    activePage,
    onNavigate: setActivePage,
  }

  if (activePage === "perfil") return <Perfil {...pageProps} />
  if (activePage === "metas") return <Metas {...pageProps} />
  if (activePage === "blog") return <Blog {...pageProps} />

  return <Inicio {...pageProps} />
}

export default Home
