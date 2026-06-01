const repo = require("../repositories/timer.repo");

function buildTimerResponse(session) {
  if (!session) return null;

  const startedAt = new Date(session.started_at);
  const endedAt = session.ended_at ? new Date(session.ended_at) : null;
  const referenceDate = endedAt || new Date();
  const elapsedSeconds = Math.max(0, Math.floor((referenceDate - startedAt) / 1000));
  const durationSeconds = session.duration_seconds || null;
  const remainingSeconds =
    session.mode === "countdown" && durationSeconds
      ? Math.max(0, durationSeconds - elapsedSeconds)
      : null;

  return {
    id: session.id,
    mode: session.mode,
    durationSeconds,
    startedAt: startedAt.toISOString(),
    endedAt: endedAt ? endedAt.toISOString() : null,
    status: session.status,
    elapsedSeconds,
    remainingSeconds,
  };
}

async function active(req, res, next) {
  try {
    const session = await repo.findActiveByUserId(req.user.id);
    res.json({ timer: buildTimerResponse(session) });
  } catch (e) {
    next(e);
  }
}

async function start(req, res, next) {
  try {
    const { mode = "stopwatch", durationSeconds } = req.body;
    const normalizedDuration = Number(durationSeconds) || null;

    if (!["stopwatch", "countdown"].includes(mode)) {
      return res.status(400).json({ message: "Modo de temporizador invalido" });
    }

    if (mode === "countdown" && (!normalizedDuration || normalizedDuration < 60)) {
      return res.status(400).json({ message: "Informe um tempo de pelo menos 1 minuto" });
    }

    const activeSession = await repo.findActiveByUserId(req.user.id);
    if (activeSession) {
      return res.status(409).json({
        message: "Ja existe uma sessao ativa",
        timer: buildTimerResponse(activeSession),
      });
    }

    const id = await repo.createSession(
      req.user.id,
      mode,
      mode === "countdown" ? normalizedDuration : null
    );
    const session = await repo.findByIdAndUserId(id, req.user.id);

    res.status(201).json({ timer: buildTimerResponse(session) });
  } catch (e) {
    next(e);
  }
}

async function finish(req, res, next) {
  try {
    const session = await repo.findByIdAndUserId(req.params.id, req.user.id);
    if (!session) return res.status(404).json({ message: "Sessao nao encontrada" });

    if (session.status === "active") {
      await repo.finishSession(session.id, req.user.id);
    }

    const finishedSession = await repo.findByIdAndUserId(session.id, req.user.id);
    res.json({ timer: buildTimerResponse(finishedSession) });
  } catch (e) {
    next(e);
  }
}

module.exports = { active, start, finish };
