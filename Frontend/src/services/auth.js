const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005"

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || "Erro ao conectar com o servidor")
  }

  return data
}

export function login({ email, senha }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  })
}

export function register({ nome, email, senha }) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ nome, email, senha }),
  })
}
