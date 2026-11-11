import type { LoginDTO } from "@/app/application/dto/auth/LoginDTO"
import type { RegisterDTO } from "@/app/application/dto/auth/RegisterDTO"
import type {
  AuthActionResult,
  IAuthRepository,
  Session,
} from "@/app/domain/repositories/IAuthRepository"
import { apiRequest } from "@/app/infrastructure/http/api-client"
import { toSession } from "@/app/infrastructure/mappers/UserMapper"
import { API_PATHS } from "@/app/shared/constants/api"
import type { ApiSuccessBody } from "@/app/shared/types/api"

export const authRepository: IAuthRepository = {
  login(credentials: LoginDTO) {
    return apiRequest<AuthActionResult>(API_PATHS.login, {
      method: "POST",
      body: JSON.stringify(credentials),
    })
  },

  register(data: RegisterDTO) {
    return apiRequest<AuthActionResult>(API_PATHS.register, {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  logout() {
    return apiRequest<AuthActionResult>(API_PATHS.logout, {
      method: "POST",
    })
  },

  async getSession(): Promise<Session> {
    const response = await apiRequest<ApiSuccessBody & { authenticated?: boolean; usuario?: string | null }>(
      API_PATHS.session,
      { method: "GET" },
    )
    return toSession(response)
  },
}
