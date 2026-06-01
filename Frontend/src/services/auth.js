export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3005"

export function isUnauthorizedError(error) {
  return error?.status === 401
}

export function handleUnauthorized() {
  localStorage.removeItem("accessToken")
  window.dispatchEvent(new Event("auth:unauthorized"))
}

export function createApiError(response, data, fallbackMessage, options = {}) {
  const error = new Error(data.message || fallbackMessage)
  error.status = response.status
  error.data = data

  if (response.status === 401 && !options.skipUnauthorizedHandler) {
    handleUnauthorized()
  }

  return error
}

async function request(path, options = {}) {
  const { headers, skipUnauthorizedHandler = false, ...fetchOptions } = options

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw createApiError(response, data, "Erro ao conectar com o servidor", { skipUnauthorizedHandler })
  }

  return data
}

export function login({ email, senha }) {
  return request("/auth/login", {
    method: "POST",
    skipUnauthorizedHandler: true,
    body: JSON.stringify({ email, senha }),
  })
}

export function register({ nome, email, telefone, cargo, senha }) {
  return request("/auth/register", {
    method: "POST",
    skipUnauthorizedHandler: true,
    body: JSON.stringify({ nome, email, telefone, cargo, senha }),
  })
}

export function getCurrentUser(accessToken) {
  return request("/users/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export function updateCurrentUser(accessToken, userData) {
  return request("/users/me", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(userData),
  })
}

export async function updateProfilePhoto(accessToken, file) {
  const formData = new FormData()
  formData.append("foto_perfil", file)

  const response = await fetch(`${API_URL}/users/me/foto`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw createApiError(response, data, "Erro ao enviar foto de perfil")
  }

  return data
}

export function deleteProfilePhoto(accessToken) {
  return request("/users/me/foto", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
