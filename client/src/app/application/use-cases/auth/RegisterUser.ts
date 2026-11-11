import type { RegisterDTO } from "@/app/application/dto/auth/RegisterDTO"
import type { AuthActionResult, IAuthRepository } from "@/app/domain/repositories/IAuthRepository"
import { validateRegister } from "@/app/shared/validators/auth"

export function createRegisterUser(authRepository: IAuthRepository) {
  return async function registerUser(data: RegisterDTO): Promise<AuthActionResult> {
    const validationError = validateRegister(data)
    if (validationError) {
      throw new Error(validationError)
    }
    return authRepository.register(data)
  }
}
