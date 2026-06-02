import { useEffect, useMemo, useState } from "react"
import abelhaImg from "../public/slothBeeAbelha.png"
import balancaImg from "../public/slothBeeBalanca.png"
import colmeiaSimboloImg from "../public/slothBeeColmeiaSimbolo.png"
import florzinhaImg from "../public/slothBeeFlorzinha.png"
import mascoteAlmofadaImg from "../public/slothBeeMascoteComAlmofada.png"
import plantinhaImg from "../public/slothBeePlantinha.png"
import { getBalance } from "../services/balance.js"
import { getHoneyPoints } from "../services/points.js"
import { getMyTeam } from "../services/teams.js"
import { finishTimer, getActiveTimer, getTimerSummary, startTimer } from "../services/timer.js"
import { defaultFocusSummary, formatFocusDuration } from "../utils/focusTime.js"
import { AppFrame, HoneyPoints, Icon, ProgressBar } from "./shared.jsx"

const FOCUS_SECONDS_PER_HONEY_POINT = 5 * 60

function formatSeconds(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds)
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0")
  const seconds = String(safeSeconds % 60).padStart(2, "0")

  return `${minutes}:${seconds}`
}

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return "Bom dia"
  if (hour < 18) return "Boa tarde"
  return "Boa noite"
}

function getFirstName(user) {
  if (!user?.nome) return ""
  return user.nome.split(" ")[0]
}

function getStartOfWeek(date) {
  const start = new Date(date)
  const dayIndex = (start.getDay() + 6) % 7
  start.setHours(0, 0, 0, 0)
  start.setDate(start.getDate() - dayIndex)
  return start
}

function getBalanceBarValues(focus, rest) {
  return Number(focus) === 0 && Number(rest) === 0
    ? { focus: "50%", rest: "50%" }
    : { focus: `${focus}%`, rest: `${rest}%` }
}

function Inicio({
  activePage,
  onNavigate,
  currentUser,
  theme,
  onToggleTheme,
}) {
  const [timer, setTimer] = useState(null)
  const [timerMode, setTimerMode] = useState("stopwatch")
  const [focusMinutes, setFocusMinutes] = useState(25)
  const [now, setNow] = useState(0)
  const [timerMessage, setTimerMessage] = useState("")
  const [isTimerLoading, setIsTimerLoading] = useState(false)
  const [honeyPoints, setHoneyPoints] = useState(0)
  const [honeyToast, setHoneyToast] = useState(null)
  const [balance, setBalance] = useState({
    focus: 0,
    rest: 100,
    focusMinutes: 0,
    completedGoals: 0,
    completedSessions: 0,
  })
  const [focusSummary, setFocusSummary] = useState(defaultFocusSummary)
  const [myTeam, setMyTeam] = useState(null)
  const greeting = getGreeting()
  const firstName = getFirstName(currentUser)

  useEffect(() => {
    let ignore = false

    async function loadActiveTimer() {
      try {
        const data = await getActiveTimer()
        if (!ignore) setTimer(data.timer)
      } catch (error) {
        if (!ignore) setTimerMessage(error.message)
      }

      try {
        const pointsData = await getHoneyPoints()
        if (!ignore) setHoneyPoints(pointsData.honeyPoints)
        const summaryData = await getTimerSummary()
        if (!ignore) setFocusSummary(summaryData.focusSummary || defaultFocusSummary)
      } catch (error) {
        if (!ignore) setTimerMessage(error.message)
      }

      try {
        const balanceData = await getBalance()
        if (!ignore) setBalance(balanceData.balance)
      } catch {
        if (!ignore) setBalance((current) => ({ ...current, focus: 0, rest: 100 }))
      }

      try {
        const teamData = await getMyTeam()
        if (!ignore) setMyTeam(teamData.team)
      } catch {
        if (!ignore) setMyTeam(null)
      }
    }

    loadActiveTimer()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    setNow(Date.now())
    const interval = window.setInterval(() => setNow(Date.now()), 1000)

    return () => window.clearInterval(interval)
  }, [])

  async function refreshBalance() {
    try {
      const balanceData = await getBalance()
      setBalance(balanceData.balance)
    } catch {
      setBalance((current) => ({ ...current, focus: 0, rest: 100 }))
    }
  }

  function showHoneyToast(points) {
    if (!points || points <= 0) return

    setHoneyToast({ points, id: Date.now() })
  }

  const currentSeconds = useMemo(() => {
    if (!timer) return 0

    if (timer.status === "finished") {
      return timer.mode === "countdown" ? 0 : timer.elapsedSeconds
    }

    if (!now) return timer.mode === "countdown" ? timer.durationSeconds : timer.elapsedSeconds

    const startedAt = new Date(timer.startedAt).getTime()
    const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000))

    if (timer.mode === "countdown") {
      return Math.max(0, timer.durationSeconds - elapsed)
    }

    return elapsed
  }, [now, timer])

  const liveFocusSummary = useMemo(() => {
    if (!timer || timer.status !== "active") return focusSummary

    const dailySeconds = [...(focusSummary.dailySeconds || defaultFocusSummary.dailySeconds)]
    const startedAt = new Date(timer.startedAt)
    const today = new Date()
    const startedToday = startedAt.toDateString() === today.toDateString()
    const startedThisWeek = startedAt >= getStartOfWeek(today)

    if (!startedToday && !startedThisWeek) return focusSummary

    const elapsedSeconds =
      timer.mode === "countdown" && timer.durationSeconds
        ? Math.min(currentSeconds === 0 ? timer.durationSeconds : timer.durationSeconds - currentSeconds, timer.durationSeconds)
        : currentSeconds

    const dayIndex = (startedAt.getDay() + 6) % 7
    if (startedThisWeek) dailySeconds[dayIndex] = (dailySeconds[dayIndex] || 0) + elapsedSeconds

    return {
      todaySeconds: focusSummary.todaySeconds + (startedToday ? elapsedSeconds : 0),
      weekSeconds: focusSummary.weekSeconds + (startedThisWeek ? elapsedSeconds : 0),
      dailySeconds,
    }
  }, [currentSeconds, focusSummary, timer])

  const chartPoints = useMemo(() => {
    const dailySeconds = liveFocusSummary.dailySeconds || defaultFocusSummary.dailySeconds
    const maxSeconds = Math.max(3600, ...dailySeconds)

    return dailySeconds.map((seconds, index) => {
      const x = 76 + index * 84
      const y = 150 - (Math.max(0, seconds) / maxSeconds) * 126
      return [x, Math.max(24, Math.min(150, y))]
    })
  }, [liveFocusSummary])

  const chartLine = chartPoints.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ")
  const chartArea = `${chartLine} L${chartPoints[chartPoints.length - 1][0]} 150 L${chartPoints[0][0]} 150 Z`
  const liveEarnedHoneyPoints = timer?.status === "active" ? Math.floor(currentSeconds / FOCUS_SECONDS_PER_HONEY_POINT) : 0
  const liveHoneyPoints = honeyPoints + liveEarnedHoneyPoints
  const teamFocus = myTeam?.balance?.focus?.percentage ?? 0
  const teamRest = myTeam?.balance?.rest?.percentage ?? 0
  const teamFocusColor = myTeam?.balance?.focus?.color || "#f2b52f"
  const teamRestColor = myTeam?.balance?.rest?.color || "#91ad35"
  const balanceBar = getBalanceBarValues(balance.focus, balance.rest)
  const teamBalanceBar = getBalanceBarValues(teamFocus, teamRest)

  useEffect(() => {
    if (!timer || timer.status !== "active" || timer.mode !== "countdown" || currentSeconds > 0 || isTimerLoading) return

    async function finishCountdown() {
      try {
        setIsTimerLoading(true)
        const data = await finishTimer(timer.id)
        setTimer(data.timer)
        setHoneyPoints(data.honeyPoints)
        await refreshBalance()
        setFocusSummary(data.focusSummary || defaultFocusSummary)
        setTimerMessage("Sessão de foco finalizada")
        if (data.earnedHoneyPoints > 0) {
          showHoneyToast(data.earnedHoneyPoints)
        }
      } catch (error) {
        setTimerMessage(error.message)
      } finally {
        setIsTimerLoading(false)
      }
    }

    finishCountdown()
  }, [currentSeconds, isTimerLoading, timer])

  async function handleStartTimer() {
    try {
      setIsTimerLoading(true)
      setTimerMessage("")
      const data = await startTimer({
        mode: timerMode,
        durationSeconds: timerMode === "countdown" ? focusMinutes * 60 : null,
      })
      setTimer(data.timer)
    } catch (error) {
      setTimer(error.data?.timer || null)
      setTimerMessage(error.message)
    } finally {
      setIsTimerLoading(false)
    }
  }

  async function handleFinishTimer() {
    if (!timer) return

    try {
      setIsTimerLoading(true)
      setTimerMessage("")
      const data = await finishTimer(timer.id)
      setTimer(data.timer)
      setHoneyPoints(data.honeyPoints)
      await refreshBalance()
      setFocusSummary(data.focusSummary || defaultFocusSummary)
      setTimerMessage("Sessão de foco finalizada")
      if (data.earnedHoneyPoints > 0) {
        setTimerMessage(`Sessão finalizada. Voce ganhou ${data.earnedHoneyPoints} pontos de mel.`)
        showHoneyToast(data.earnedHoneyPoints)
      }
    } catch (error) {
      setTimerMessage(error.message)
    } finally {
      setIsTimerLoading(false)
    }
  }

  function handleNewTimer() {
    setTimer(null)
    setTimerMessage("")
  }

  return (
    <AppFrame activePage={activePage} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme}>
      {honeyToast && (
        <div
          key={honeyToast.id}
          className="honey-toast fixed inset-x-4 top-4 z-50 mx-auto max-w-sm overflow-hidden rounded-lg md:inset-x-auto md:right-8 md:mx-0"
          role="status"
        >
          <button
            aria-label="Fechar notificacao de pontos de mel"
            className="honey-toast-close absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors"
            onClick={() => setHoneyToast(null)}
            type="button"
          >
            <Icon className="h-4 w-4" name="close" />
          </button>
          <div className="flex items-center gap-3 px-4 py-3 pr-10">
            <span className="honey-toast-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-inner">
              <img src={florzinhaImg} alt="" className="h-10 w-10 object-cover" />
            </span>
            <div className="min-w-0 leading-tight">
              <span className="honey-toast-badge inline-flex rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide">
                +{honeyToast.points} mel
              </span>
              <strong className="honey-toast-title mt-1 block text-base font-black">Ponto de mel conquistado!</strong>
              <span className="honey-toast-text text-[12px] font-bold">5 minutos de foco concluídos</span>
            </div>
          </div>
        </div>
      )}
      <section className="inicio-layout">
        <section className="inicio-hero relative min-h-[170px] overflow-hidden rounded-lg bg-white shadow-sm sm:min-h-[220px]">
          <div className="inicio-greeting-card absolute left-5 top-7 z-10 h-28 w-32 -rotate-12 rounded-lg border-2 border-[#f1c66f] bg-[#fff7df] p-3 shadow-[0_16px_34px_rgba(138,85,31,0.22)] sm:left-9 sm:top-9 sm:h-32 sm:w-36 sm:p-4">
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#a5bd43] shadow-[0_0_0_4px_rgba(165,189,67,0.18)]" />
            <p className="pr-3 text-[14px] font-black leading-tight text-[#6f3f15] sm:text-[17px]">
              {greeting}
              {firstName ? (
                <>
                  ,<br />
                  {firstName}!
                </>
              ) : (
                "!"
              )}
            </p>
            <span className="mt-4 block text-center text-3xl text-[#5f8f34] sm:mt-5 sm:text-4xl">{"\u2665"}</span>
          </div>

          <img
            src={plantinhaImg}
            alt="Mascote SlothBee"
            className="absolute bottom-[-16%] right-[-2%] h-[128%] w-auto max-w-none object-contain sm:right-[6%] lg:right-[3%] xl:right-[6%]"
          />
        </section>

        <aside className="inicio-side grid gap-2">
          <HoneyPoints
            value={liveHoneyPoints}
            compact
            className="flex h-full items-center justify-center [&_img]:h-8 [&_img]:w-8 [&_span]:text-[10px] [&_strong]:text-[14px]"
          />

          <section className="flex min-h-[268px] flex-col items-center gap-2 rounded-lg bg-white px-4 py-4 text-center shadow-sm">
            <div className="flex items-center justify-center gap-1 text-[11px] font-extrabold leading-tight text-[#8d641e]">
              <Icon className="h-6 w-6 shrink-0 text-[#9dbb35]" name="timer" />
              Temporizador de foco
            </div>
            <div className="my-1 text-5xl font-black leading-none text-black">
              {formatSeconds(currentSeconds)}
            </div>

            {!timer && (
              <div className="grid w-full gap-2">
                <div className="grid grid-cols-2 rounded-md bg-[#f7f0d8] p-1">
                  <button
                    className={`h-8 rounded text-[10px] font-extrabold transition-colors ${
                      timerMode === "stopwatch" ? "bg-white text-[#6a431d] shadow-sm" : "text-[#957334]"
                    }`}
                    onClick={() => setTimerMode("stopwatch")}
                    type="button"
                  >
                    Cronometro
                  </button>
                  <button
                    className={`h-8 rounded text-[10px] font-extrabold transition-colors ${
                      timerMode === "countdown" ? "bg-white text-[#6a431d] shadow-sm" : "text-[#957334]"
                    }`}
                    onClick={() => setTimerMode("countdown")}
                    type="button"
                  >
                    Zerar
                  </button>
                </div>

                {timerMode === "countdown" && (
                  <label className="grid gap-1 text-left text-[10px] font-bold text-[#8d641e]">
                    Minutos
                    <input
                      className="h-8 rounded-md border border-[#eee5bf] bg-white px-2 text-[12px] font-bold text-[#2f241d]"
                      min="1"
                      type="number"
                      value={focusMinutes}
                      onChange={(event) => setFocusMinutes(Number(event.target.value))}
                    />
                  </label>
                )}
              </div>
            )}

            <span className="mx-auto inline-flex min-h-8 items-center rounded-full bg-[#eee5bf] px-5 text-[10px] font-bold text-[#957334]">
              {timer?.status === "finished" ? "Sessão finalizada" : "Sessão de foco"}
            </span>

            {timerMessage && <p className="min-h-4 text-[10px] font-bold leading-tight text-[#8d641e]">{timerMessage}</p>}

            {!timer || timer.status === "finished" ? (
              <button
                className="mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#a5bd43] text-[11px] font-extrabold text-[#5f4c16] transition-colors hover:bg-[#97ad39] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isTimerLoading}
                onClick={timer?.status === "finished" ? handleNewTimer : handleStartTimer}
                type="button"
              >
                {timer?.status === "finished" ? "Novo foco" : "Iniciar foco"}
                <Icon className="h-5 w-5" name="play" />
              </button>
            ) : (
              <button
                className="mt-auto flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#eee5bf] text-[11px] font-extrabold text-[#786018] transition-colors hover:bg-[#e3d798] disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isTimerLoading}
                onClick={handleFinishTimer}
                type="button"
              >
                Finalizar
                <Icon className="h-5 w-5" name="timer" />
              </button>
            )}
          </section>
        </aside>

        <section className="inicio-balance rounded-lg bg-white px-4 py-2 shadow-sm sm:px-7">
          <div className="flex items-center justify-center gap-2 text-[13px] font-extrabold text-[#b16f1e]">
            <img src={balancaImg} alt="" className="h-6 w-6 object-cover" />
            Equilíbrio
          </div>
          <div className="mt-1.5 grid grid-cols-2 items-center gap-3 text-center sm:gap-8">
            <div className="flex items-center justify-center gap-2">
              <img src={abelhaImg} alt="" className="h-8 w-8 object-cover" />
              <div className="text-left">
                <p className="text-[12px] font-black text-[#6a431d]">Foco</p>
                <p className="text-[12px] font-black text-[#e1a11f]">{balance.focus}%</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <img src={mascoteAlmofadaImg} alt="" className="h-8 w-8 object-cover" />
              <div className="text-left">
                <p className="text-[12px] font-black text-[#6a431d]">Descanso</p>
                <p className="text-[12px] font-black text-[#85a834]">{balance.rest}%</p>
              </div>
            </div>
          </div>
          <div className="mt-1.5">
            <ProgressBar left={balanceBar.focus} right={balanceBar.rest} />
          </div>
        </section>

        <section className="inicio-team rounded-lg bg-white px-5 py-5 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_190px] sm:items-center lg:grid-cols-[minmax(0,1fr)_210px]">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[13px] font-extrabold text-[#8a551f]">
                <img src={colmeiaSimboloImg} alt="" className="h-6 w-6 object-cover" />
                {myTeam?.nome_equipe || "Equipe progresso"}
              </div>
              <p className="mt-1 text-[11px] font-bold text-[#765126]">
                {myTeam
                  ? `${myTeam.total_integrantes} usuarios na equipe - ${myTeam.metas_equipe} metas cumpridas`
                  : "Voce ainda nao esta em uma equipe."}
              </p>
              <div className="mt-3 flex justify-around text-[13px] font-bold">
                <span style={{ color: teamFocusColor }}>{teamFocus}% foco</span>
                <span style={{ color: teamRestColor }}>{teamRest}% descanso</span>
              </div>
              <div className="mt-2 w-full">
                <ProgressBar left={teamBalanceBar.focus} right={teamBalanceBar.rest} />
              </div>
            </div>

            <HoneyPoints
              value={myTeam?.pontos_equipe ?? 0}
              variant="tall"
              className="self-center py-4 sm:h-[82px] [&_img]:h-8 [&_img]:w-8 [&_span]:text-[10px] [&_strong]:text-[14px]"
            />
          </div>
        </section>

        <section className="inicio-insights overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="px-5 pb-3 pt-4">
            <h2 className="text-[18px] font-black text-[#4d3323]">Seu Progresso</h2>
            <div className="mt-2 h-40">
              <svg className="h-full w-full" viewBox="0 0 640 190" role="img" aria-label="Gráfico de progresso semanal">
                <defs>
                  <linearGradient id="progressArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#b7cb72" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#f6f0db" stopOpacity="0.12" />
                  </linearGradient>
                </defs>
                <g className="text-[12px] font-bold" fill="#8f887c">
                  <text x="8" y="30">100</text>
                  <text x="14" y="72">75</text>
                  <text x="14" y="114">50</text>
                  <text x="14" y="156">25</text>
                  <text x="20" y="182">0</text>
                </g>
                <g stroke="#efe6d3" strokeWidth="1">
                  <line x1="54" x2="620" y1="24" y2="24" />
                  <line x1="54" x2="620" y1="66" y2="66" />
                  <line x1="54" x2="620" y1="108" y2="108" />
                  <line x1="54" x2="620" y1="150" y2="150" />
                </g>
                <path
                  d={chartArea}
                  fill="url(#progressArea)"
                />
                <path
                  d={chartLine}
                  fill="none"
                  stroke="#7ea34a"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                {chartPoints.map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} fill="#86a957" r="6" />
                ))}
                {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => (
                  <text key={day} x={76 + index * 84} y="178" fill="#8f887c" fontSize="13" fontWeight="700" textAnchor="middle">
                    {day}
                  </text>
                ))}
              </svg>
            </div>
          </div>

          <div className="grid gap-4 border-t border-[#efe3cf] bg-[#fffaf0] px-5 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#8cb4dc] text-[#7aa1cb]">
                <Icon className="h-7 w-7" name="timer" />
              </span>
              <div>
                <p className="text-[15px] font-black text-[#4d3323]">Melhor Horário</p>
                <strong className="block text-[24px] leading-tight text-[#2f241d]">09:00 - 11:00</strong>
                <span className="text-[14px] font-bold text-[#8f887c]">Você é mais produtivo!</span>
              </div>
            </div>

            <div className="hidden h-16 w-px bg-[#ead7b9] sm:block" />

            <div className="flex items-center justify-between gap-4">
              <div className="inicio-sun" aria-hidden="true" />
              <div className="grid gap-2 text-right">
                <p className="text-[15px] font-black text-[#4d3323]">Total de Foco</p>
                <div>
                  <strong className="block text-[24px] leading-tight text-[#2f241d]">
                    {formatFocusDuration(liveFocusSummary.todaySeconds)}
                  </strong>
                  <span className="text-[14px] font-bold text-[#8f887c]">hoje</span>
                </div>
                <div>
                  <strong className="block text-[24px] leading-tight text-[#2f241d]">
                    {formatFocusDuration(liveFocusSummary.weekSeconds)}
                  </strong>
                  <span className="text-[14px] font-bold text-[#8f887c]">esta semana</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </AppFrame>
  )
}

export default Inicio
