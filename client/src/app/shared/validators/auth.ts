import type { LoginDTO } from "@/app/application/dto/auth/LoginDTO"
import type { RegisterDTO } from "@/app/application/dto/auth/RegisterDTO"

export function validateLogin(dto: LoginDTO): string | null {
  if (!dto.documento.trim() || !dto.password) {
    return "Los campos están incompletos"
  }
  return null
}

export function validateRegister(dto: RegisterDTO): string | null {
  if (!dto.usuario.trim() || !dto.documento.trim() || !dto.email.trim() || !dto.password) {
    return "Los campos están incompletos"
  }
  return null
}
