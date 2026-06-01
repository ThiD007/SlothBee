import { useCallback, useEffect, useState } from "react"
import { getCurrentUser, isAdminEmail, isUnauthorizedError, login, register } from "../services/auth.js"
import AdminBlog from "./AdminBlog.jsx"
import AdminEquipes from "./AdminEquipes.jsx"
import AdminGraficoEquipe from "./AdminGraficoEquipe.jsx"
import AdminHome from "./AdminHome.jsx"
import AdminMetas from "./AdminMetas.jsx"
import AdminUsuarios from "./AdminUsuarios.jsx"
import Blog from "./Blog.jsx"
import Cadastro from "./Cadastro.jsx"
import Inicio from "./inicio.jsx"
import LandingPage from "./LandingPage.jsx"
import Login from "./Login.jsx"
import Metas from "./Metas.jsx"
import Perfil from "./Perfil.jsx"

const adminPages = new Set(["admin-inicio", "admin-equipes", "admin-usuarios", "admin-grafico", "admin-metas", "admin-blog"])

function getInitialPage() {
  const hashPage = window.location.hash.replace("#", "")
  if (hashPage === "admin") return localStorage.getItem("accessToken") ? "admin-inicio" : "landing"
  if (adminPages.has(hashPage)) return localStorage.getItem("accessToken") ? hashPage : "landing"
  return localStorage.getItem("accessToken") ? "inicio" : "landing"
}

function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme
  return "light"
}

function Home() {
  const [activePage, setActivePage] = useState(getInitialPage)
  const [theme, setTheme] = useState(getInitialTheme)
  const [authModal, setAuthModal] = useState(null)
  const [authMessage, setAuthMessage] = useState("")
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [isSessionLoading, setIsSessionLoading] = useState(Boolean(localStorage.getItem("accessToken")))
  const [currentUser, setCurrentUser] = useState(null)

  const isCurrentUserAdmin = isAdminEmail(currentUser?.email)

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  function handleToggleTheme() {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))
  }

  const clearRouteHash = useCallback(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search)
    }
  }, [])

  const openPage = useCallback(
    (page) => {
      setActivePage(page)
      if (adminPages.has(page)) {
        window.location.hash = page
        return
      }

      clearRouteHash()
    },
    [clearRouteHash]
  )

  const handleInvalidSession = useCallback(() => {
    localStorage.removeItem("accessToken")
    setCurrentUser(null)
    setAuthModal(null)
    setAuthMessage("Sua sessão expirou. Faca login novamente.")
    setActivePage("landing")
    clearRouteHash()
  }, [clearRouteHash])

  useEffect(() => {
    window.addEventListener("auth:unauthorized", handleInvalidSession)

    return () => {
      window.removeEventListener("auth:unauthorized", handleInvalidSession)
    }
  }, [handleInvalidSession])

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken")
    if (!accessToken) return

    let ignore = false

    async function validateSession() {
      try {
        const user = await getCurrentUser(accessToken)
        if (!ignore) {
          setCurrentUser(user)
          if (isAdminEmail(user.email)) {
            setActivePage((currentPage) => {
              if (adminPages.has(currentPage)) return currentPage
              window.location.hash = "admin-inicio"
              return "admin-inicio"
            })
          }
        }
      } catch (error) {
        if (!ignore && isUnauthorizedError(error)) {
          handleInvalidSession()
        }
      } finally {
        if (!ignore) setIsSessionLoading(false)
      }
    }

    validateSession()

    return () => {
      ignore = true
    }
  }, [handleInvalidSession])

  useEffect(() => {
    if (isSessionLoading || !adminPages.has(activePage) || isCurrentUserAdmin) return

    setAuthMessage("Acesso permitido apenas para administradores.")
    setActivePage(currentUser ? "inicio" : "landing")
    clearRouteHash()
  }, [activePage, clearRouteHash, currentUser, isCurrentUserAdmin, isSessionLoading])

  function handleLogout() {
    localStorage.removeItem("accessToken")
    setCurrentUser(null)
    setIsSessionLoading(false)
    setAuthModal(null)
    setAuthMessage("")
    openPage("landing")
  }

  function handleNavigate(page) {
    if (page === "logout") {
      handleLogout()
      return
    }

    if (adminPages.has(page) && !isCurrentUserAdmin) {
      setAuthMessage("Acesso permitido apenas para administradores.")
      setActivePage(currentUser ? "inicio" : "landing")
      clearRouteHash()
      return
    }

    openPage(page)
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
      const user = await getCurrentUser(data.accessToken)
      setCurrentUser(user)
      setAuthModal(null)
      openPage(isAdminEmail(user.email) ? "admin-inicio" : "inicio")
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
      const user = await getCurrentUser(data.accessToken)
      setCurrentUser(user)
      setAuthModal(null)
      openPage(isAdminEmail(user.email) ? "admin-inicio" : "inicio")
    } catch (error) {
      setAuthMessage(error.message)
    } finally {
      setIsAuthLoading(false)
    }
  }

  if (activePage === "landing") {
    return (
      <>
        <LandingPage onOpenLogin={() => openAuthModal("login")} theme={theme} onToggleTheme={handleToggleTheme} />

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
    currentUser,
    onNavigate: handleNavigate,
    theme,
    onToggleTheme: handleToggleTheme,
  }

  if (adminPages.has(activePage) && isSessionLoading) return null
  if (adminPages.has(activePage) && !isCurrentUserAdmin) return null

  if (activePage === "admin-inicio") return <AdminHome {...pageProps} />
  if (activePage === "admin-equipes") return <AdminEquipes {...pageProps} />
  if (activePage === "admin-usuarios") return <AdminUsuarios {...pageProps} />
  if (activePage === "admin-grafico") return <AdminGraficoEquipe {...pageProps} />
  if (activePage === "admin-metas") return <AdminMetas {...pageProps} />
  if (activePage === "admin-blog") return <AdminBlog {...pageProps} />

  if (activePage === "perfil") return <Perfil {...pageProps} />
  if (activePage === "metas") return <Metas {...pageProps} />
  if (activePage === "blog") return <Blog {...pageProps} />

  return <Inicio {...pageProps} />
}

export default Home
