const repo = require("../repositories/team.repo");

const FOCUS_COLOR = "#f2b52f";
const REST_COLOR = "#91ad35";
const GOAL_WEIGHT_IN_MINUTES = 30;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildTeamBalance(team) {
  const focusMinutes = Math.floor(Number(team.focus_seconds || 0) / 60);
  const completedFocusGoals = Number(team.completed_focus_goals || 0);
  const completedRestGoals = Number(team.completed_rest_goals || 0);
  const focusScore = focusMinutes + completedFocusGoals * GOAL_WEIGHT_IN_MINUTES;
  const restScore = completedRestGoals * GOAL_WEIGHT_IN_MINUTES;
  const totalScore = focusScore + restScore;
  const focus = totalScore > 0 ? clamp(Math.round((focusScore / totalScore) * 100), 0, 100) : 0;
  const rest = totalScore > 0 ? 100 - focus : 0;

  return {
    focus: {
      percentage: focus,
      label: "foco",
      color: FOCUS_COLOR,
    },
    rest: {
      percentage: rest,
      label: "descanso",
      color: REST_COLOR,
    },
    metrics: {
      focusMinutes,
      completedFocusGoals,
      completedRestGoals,
      totalMembers: Number(team.total_integrantes || 0),
    },
  };
}

function normalizeTeam(team) {
  return {
    id: Number(team.id),
    nome_equipe: team.nome_equipe,
    pontos_equipe: Number(team.pontos_equipe || 0),
    metas_equipe: Number(team.metas_equipe || 0),
    total_integrantes: Number(team.total_integrantes || 0),
    integrantes: String(team.integrantes || "")
      .split(",")
      .filter(Boolean)
      .map((id) => Number(id)),
    balance: buildTeamBalance(team),
  };
}

function buildBalanceFromScores(focusScore, restScore) {
  const totalScore = focusScore + restScore;
  const focus = totalScore > 0 ? clamp(Math.round((focusScore / totalScore) * 100), 0, 100) : 0;
  return { focus, rest: totalScore > 0 ? 100 - focus : 0 };
}

function buildChartDay(day, timerRow, goalRow) {
  const focusMinutes = Math.floor(Number(timerRow?.focus_seconds || 0) / 60);
  const completedFocusGoals = Number(goalRow?.completed_focus_goals || 0);
  const completedRestGoals = Number(goalRow?.completed_rest_goals || 0);
  const focusScore = focusMinutes + completedFocusGoals * GOAL_WEIGHT_IN_MINUTES;
  const restScore = completedRestGoals * GOAL_WEIGHT_IN_MINUTES;
  const hasActivity = focusScore > 0 || restScore > 0;
  const balance = buildBalanceFromScores(focusScore, restScore);

  return {
    day,
    focus: hasActivity ? balance.focus : 0,
    rest: hasActivity ? balance.rest : 0,
    focusMinutes,
    completedFocusGoals,
    completedRestGoals,
  };
}

function buildMemberHighlight(member) {
  const focusMinutes = Math.floor(Number(member.focus_seconds || 0) / 60);
  const focusScore = focusMinutes + Number(member.completed_focus_goals || 0) * GOAL_WEIGHT_IN_MINUTES;
  const restScore = Number(member.completed_rest_goals || 0) * GOAL_WEIGHT_IN_MINUTES;
  const balance = buildBalanceFromScores(focusScore, restScore);

  return {
    id: Number(member.id),
    name: member.nome || "Usuario",
    value: `${balance.focus}%`,
  };
}

function validateTeamInput(body) {
  const nome_equipe = String(body.nome_equipe || body.name || "").trim();
  const rawMembers = Array.isArray(body.integrantes) ? body.integrantes : [];
  const integrantes = [...new Set(rawMembers.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0))];

  if (!nome_equipe) return { error: "Informe o nome da equipe" };

  return { nome_equipe, integrantes };
}

async function list(req, res, next) {
  try {
    const teams = await repo.listTeams();
    res.json({ teams: teams.map(normalizeTeam) });
  } catch (e) {
    next(e);
  }
}

async function me(req, res, next) {
  try {
    const team = await repo.findTeamByUserId(req.user.id);
    res.json({ team: team ? normalizeTeam(team) : null });
  } catch (e) {
    next(e);
  }
}

async function chart(req, res, next) {
  try {
    const team = await repo.findTeamById(req.params.id);
    if (!team) return res.status(404).json({ message: "Equipe nao encontrada" });

    const { timerRows, goalRows, memberRows } = await repo.getWeeklyChartData(req.params.id);
    const dayLabels = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
    const chartData = dayLabels.map((day, dayIndex) =>
      buildChartDay(
        day,
        timerRows.find((row) => Number(row.day_index) === dayIndex),
        goalRows.find((row) => Number(row.day_index) === dayIndex)
      )
    );
    const members = memberRows
      .map(buildMemberHighlight)
      .sort((left, right) => Number(right.value.replace("%", "")) - Number(left.value.replace("%", "")))
      .slice(0, 5);

    res.json({ team: normalizeTeam(team), chartData, members });
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const input = validateTeamInput(req.body);
    if (input.error) return res.status(400).json({ message: input.error });

    const id = await repo.createTeam(input);
    const team = await repo.findTeamById(id);
    res.status(201).json({ team: normalizeTeam(team) });
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const input = validateTeamInput(req.body);
    if (input.error) return res.status(400).json({ message: input.error });

    const updated = await repo.updateTeam(req.params.id, input);
    if (!updated) return res.status(404).json({ message: "Equipe nao encontrada" });

    const team = await repo.findTeamById(req.params.id);
    res.json({ team: normalizeTeam(team) });
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await repo.deleteTeam(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Equipe nao encontrada" });

    res.json({ message: "Equipe removida" });
  } catch (e) {
    next(e);
  }
}

module.exports = { list, me, chart, create, update, remove };
