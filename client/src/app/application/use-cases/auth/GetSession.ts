import type { IAuthRepository, Session } from "@/app/domain/repositories/IAuthRepository"

export function createGetSession(authRepository: IAuthRepository) {
  return async function getSession(): Promise<Session> {
    return authRepository.getSession()
  }
}
