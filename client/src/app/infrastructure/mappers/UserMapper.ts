import type { User } from "@/app/domain/entities/User"
import type { Session } from "@/app/domain/repositories/IAuthRepository"

type SessionResponse = {
  status?: string
  authenticated?: boolean
  usuario?: string | null
}

export function toSession(response: SessionResponse): Session {
  const authenticated = Boolean(response.authenticated && response.usuario)
  const user: User | null = authenticated && response.usuario
    ? { documento: String(response.usuario) }
    : null

  return { authenticated, user }
}
