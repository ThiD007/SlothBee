import { useState } from "react"
import { login, register } from "../services/auth.js"
import AdminBlog from "./AdminBlog.jsx"
import AdminEquipes from "./AdminEquipes.jsx"
import AdminGraficoEquipe from "./AdminGraficoEquipe.jsx"
import AdminHome from "./AdminHome.jsx"
import AdminMetas from "./AdminMetas.jsx"
import Blog from "./Blog.jsx"
import Cadastro from "./Cadastro.jsx"
import Inicio from "./inicio.jsx"
import LandingPage from "./LandingPage.jsx"
import Login from "./Login.jsx"
import Metas from "./Metas.jsx"
import Perfil from "./Perfil.jsx"

const adminPages = new Set(["admin-inicio", "admin-equipes", "admin-grafico", "admin-metas", "admin-blog"])

function getInitialPage() {
  const hashPage = window.location.hash.replace("#", "")
  if (hashPage === "admin") return "admin-inicio"
  if (adminPages.has(hashPage)) return hashPage
  return localStorage.getItem("accessToken") ? "inicio" : "landing"
}

function Home() {
  const [activePage, setActivePage] = useState(getInitialPage)
  const [authModal, setAuthModal] = useState(null)
  const [authMessage, setAuthMessage] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  function handleNavigate(page) {
    setActivePage(page)
    if (adminPages.has(page)) {
      window.location.hash = page
      return
    }
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search)
    }
  }

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
      handleNavigate("inicio")
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
      handleNavigate("inicio")
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
    onNavigate: handleNavigate,
  }

  if (activePage === "admin-inicio") return <AdminHome {...pageProps} />
  if (activePage === "admin-equipes") return <AdminEquipes {...pageProps} />
  if (activePage === "admin-grafico") return <AdminGraficoEquipe {...pageProps} />
  if (activePage === "admin-metas") return <AdminMetas {...pageProps} />
  if (activePage === "admin-blog") return <AdminBlog {...pageProps} />

  if (activePage === "perfil") return <Perfil {...pageProps} />
  if (activePage === "metas") return <Metas {...pageProps} />
  if (activePage === "blog") return <Blog {...pageProps} />

  return <Inicio {...pageProps} />
}

export default Home
