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

export function getTeams() {
  return request("/teams");
}

export function getMyTeam() {
  return request("/teams/me");
}

export function getTeamChart(id) {
  return request(`/teams/${id}/chart`);
}

export function createTeam(team) {
  return request("/teams", {
    method: "POST",
    body: JSON.stringify(team),
  });
}

export function updateTeam(id, team) {
  return request(`/teams/${id}`, {
    method: "PUT",
    body: JSON.stringify(team),
  });
}

export function deleteTeam(id) {
  return request(`/teams/${id}`, { method: "DELETE" });
}
