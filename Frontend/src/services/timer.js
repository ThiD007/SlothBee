const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005";

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
    const error = new Error(data.message || "Erro ao conectar com o servidor");
    error.data = data;
    throw error;
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
