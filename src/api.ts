const BASE = import.meta.env.VITE_API_URL ?? ''

export async function apiFetch(path: string, options?: RequestInit) {
  return fetch(`${BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })
}
