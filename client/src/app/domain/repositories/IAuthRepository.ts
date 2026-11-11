import type { LoginDTO } from "@/app/application/dto/auth/LoginDTO"
import type { RegisterDTO } from "@/app/application/dto/auth/RegisterDTO"
import type { User } from "@/app/domain/entities/User"

export type AuthActionResult = {
  status: string
  message?: string
  redirect?: string
}

export type Session = {
  authenticated: boolean
  user: User | null
}

export type IAuthRepository = {
  login(credentials: LoginDTO): Promise<AuthActionResult>
  register(data: RegisterDTO): Promise<AuthActionResult>
  logout(): Promise<AuthActionResult>
  getSession(): Promise<Session>
}
