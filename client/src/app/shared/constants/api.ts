export const API_PATHS = {
  login: "/api/login",
  register: "/api/register",
  logout: "/api/logout",
  session: "/api/session",
} as const

export const QUERY_KEYS = {
  session: ["session"] as const,
}
