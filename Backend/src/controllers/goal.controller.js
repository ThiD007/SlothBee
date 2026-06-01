const goalRepo = require("../repositories/goal.repo");
const pointsRepo = require("../repositories/points.repo");

const GOAL_POINTS = 15;

function normalizeGoal(goal) {
  return {
    id: goal.id,
    text: goal.titulo,
    points: GOAL_POINTS,
    type: goal.tipo,
    done: Boolean(goal.done),
  };
}

function validateGoalInput(titulo, pontos) {
  const normalizedTitle = String(titulo || "").trim();
  const normalizedPoints = Number(pontos);

  if (!normalizedTitle) return { error: "Informe o titulo da meta" };
  if (!Number.isInteger(normalizedPoints) || normalizedPoints < 1) {
    return { error: "Informe uma pontuacao valida" };
  }

  return { titulo: normalizedTitle, pontos: normalizedPoints };
}

async function list(req, res, next) {
  try {
    const goals = await goalRepo.listGoalsForUser(req.user.id);
    res.json({
      today: goals.filter((goal) => goal.tipo === "today").map(normalizeGoal),
      selfcare: goals.filter((goal) => goal.tipo === "selfcare").map(normalizeGoal),
    });
  } catch (e) {
    next(e);
  }
}

async function toggle(req, res, next) {
  try {
    const goal = await goalRepo.findGoalForUser(req.params.id, req.user.id);
    if (!goal) return res.status(404).json({ message: "Meta nao encontrada" });

    const completion = await goalRepo.findCompletion(goal.id, req.user.id);
    const pointsDelta = completion ? -GOAL_POINTS : GOAL_POINTS;

    if (completion) {
      await goalRepo.uncompleteGoal(goal.id, req.user.id);
    } else {
      await goalRepo.completeGoal(goal.id, req.user.id);
    }

    const honeyPoints = await pointsRepo.addHoneyPoints(req.user.id, pointsDelta);

    res.json({
      goal: normalizeGoal({ ...goal, done: !completion }),
      honeyPoints,
    });
  } catch (e) {
    next(e);
  }
}

async function createSelfcare(req, res, next) {
  try {
    const input = validateGoalInput(req.body.titulo || req.body.text, GOAL_POINTS);
    if (input.error) return res.status(400).json({ message: input.error });

    const id = await goalRepo.createSelfcareGoal(req.user.id, input.titulo, input.pontos);
    res.status(201).json({ goal: { id, text: input.titulo, points: input.pontos, type: "selfcare", done: false } });
  } catch (e) {
    next(e);
  }
}

async function updateSelfcare(req, res, next) {
  try {
    const input = validateGoalInput(req.body.titulo || req.body.text, GOAL_POINTS);
    if (input.error) return res.status(400).json({ message: input.error });

    await goalRepo.updateSelfcareGoal(req.params.id, req.user.id, input.titulo, input.pontos);
    res.json({ goal: { id: Number(req.params.id), text: input.titulo, points: input.pontos, type: "selfcare" } });
  } catch (e) {
    next(e);
  }
}

async function deleteSelfcare(req, res, next) {
  try {
    await goalRepo.deleteSelfcareGoal(req.params.id, req.user.id);
    res.json({ message: "Meta removida" });
  } catch (e) {
    next(e);
  }
}

async function adminListToday(req, res, next) {
  try {
    const goals = await goalRepo.listTodayAdminGoals();
    res.json({ goals: goals.map(normalizeGoal) });
  } catch (e) {
    next(e);
  }
}

async function adminCreateToday(req, res, next) {
  try {
    const input = validateGoalInput(req.body.titulo || req.body.text, GOAL_POINTS);
    if (input.error) return res.status(400).json({ message: input.error });

    const id = await goalRepo.createTodayGoal(input.titulo, input.pontos);
    res.status(201).json({ goal: { id, text: input.titulo, points: input.pontos, type: "today" } });
  } catch (e) {
    next(e);
  }
}

async function adminUpdateToday(req, res, next) {
  try {
    const input = validateGoalInput(req.body.titulo || req.body.text, GOAL_POINTS);
    if (input.error) return res.status(400).json({ message: input.error });

    await goalRepo.updateTodayGoal(req.params.id, input.titulo, input.pontos);
    res.json({ goal: { id: Number(req.params.id), text: input.titulo, points: input.pontos, type: "today" } });
  } catch (e) {
    next(e);
  }
}

async function adminDeleteToday(req, res, next) {
  try {
    await goalRepo.deleteTodayGoal(req.params.id);
    res.json({ message: "Meta removida" });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  list,
  toggle,
  createSelfcare,
  updateSelfcare,
  deleteSelfcare,
  adminListToday,
  adminCreateToday,
  adminUpdateToday,
  adminDeleteToday,
};
