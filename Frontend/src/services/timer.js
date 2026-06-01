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

export function getActiveTimer() {
  return request("/timers/active");
}

export function startTimer({ mode, durationSeconds }) {
  return request("/timers/start", {
    method: "POST",
    body: JSON.stringify({ mode, durationSeconds }),
  });
}

export function finishTimer(id) {
  return request(`/timers/${id}/finish`, {
    method: "PATCH",
  });
}
