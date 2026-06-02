import { API_URL, createApiError } from "./auth.js";

async function request(path, options = {}) {
  const accessToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw createApiError(response, data, "Erro ao conectar com o servidor");
  }

  return data;
}

export function getGoals() {
  return request("/goals");
}

export function getCompletedGoalsCount() {
  return request("/goals/completed-count");
}

export function toggleGoal(id) {
  return request(`/goals/${id}/toggle`, { method: "PATCH" });
}

export function createSelfcareGoal(goal) {
  return request("/goals/selfcare", {
    method: "POST",
    body: JSON.stringify(goal),
  });
}

export function updateSelfcareGoal(id, goal) {
  return request(`/goals/selfcare/${id}`, {
    method: "PUT",
    body: JSON.stringify(goal),
  });
}

export function deleteSelfcareGoal(id) {
  return request(`/goals/selfcare/${id}`, { method: "DELETE" });
}

export function getAdminTodayGoals() {
  return request("/admin/goals/today");
}

export function getAdminGoalsSummary() {
  return request("/admin/goals/summary");
}

export function createAdminTodayGoal(goal) {
  return request("/admin/goals/today", {
    method: "POST",
    body: JSON.stringify(goal),
  });
}

export function updateAdminTodayGoal(id, goal) {
  return request(`/admin/goals/today/${id}`, {
    method: "PUT",
    body: JSON.stringify(goal),
  });
}

export function deleteAdminTodayGoal(id) {
  return request(`/admin/goals/today/${id}`, { method: "DELETE" });
}
