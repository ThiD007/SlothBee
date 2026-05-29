import { useState } from "react"
import Cadastro from "./Cadastro.jsx"
import Inicio from "./inicio.jsx"
import LandingPage from "./LandingPage.jsx"
import Login from "./Login.jsx"
import Perfil from "./Perfil.jsx"

function Home() {
  const [screen, setScreen] = useState("landing")
  const [modal, setModal] = useState(null)

  function enterApp() {
    setModal(null)
    setScreen("inicio")
  }

  if (screen === "inicio") {
    return <Inicio activePage="inicio" onNavigate={setScreen} />
  }

  if (screen === "perfil") {
    return <Perfil activePage="perfil" onNavigate={setScreen} />
  }

  return (
    <>
      <LandingPage onOpenLogin={() => setModal("login")} />
      {modal === "login" && (
        <Login
          onClose={() => setModal(null)}
          onEnter={enterApp}
          onOpenCadastro={() => setModal("cadastro")}
        />
      )}
      {modal === "cadastro" && (
        <Cadastro
          onClose={() => setModal(null)}
          onBackToLogin={() => setModal("login")}
          onCreate={enterApp}
        />
      )}
    </>
  )
}

export default Home
