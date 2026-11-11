import type { LoginDTO } from "@/app/application/dto/auth/LoginDTO"
import type { AuthActionResult, IAuthRepository } from "@/app/domain/repositories/IAuthRepository"
import { validateLogin } from "@/app/shared/validators/auth"

export function createLoginUser(authRepository: IAuthRepository) {
  return async function loginUser(credentials: LoginDTO): Promise<AuthActionResult> {
    const validationError = validateLogin(credentials)
    if (validationError) {
      throw new Error(validationError)
    }
    return authRepository.login(credentials)
  }
}
