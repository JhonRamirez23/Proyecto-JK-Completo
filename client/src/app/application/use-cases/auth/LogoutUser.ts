import type { AuthActionResult, IAuthRepository } from "@/app/domain/repositories/IAuthRepository"

export function createLogoutUser(authRepository: IAuthRepository) {
  return async function logoutUser(): Promise<AuthActionResult> {
    return authRepository.logout()
  }
}
