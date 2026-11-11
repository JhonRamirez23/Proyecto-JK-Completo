import { createGetSession } from "@/app/application/use-cases/auth/GetSession"
import { createLoginUser } from "@/app/application/use-cases/auth/LoginUser"
import { createLogoutUser } from "@/app/application/use-cases/auth/LogoutUser"
import { createRegisterUser } from "@/app/application/use-cases/auth/RegisterUser"
import { authRepository } from "@/app/infrastructure/repositories/AuthRepositoryImpl"

export const loginUser = createLoginUser(authRepository)
export const registerUser = createRegisterUser(authRepository)
export const logoutUser = createLogoutUser(authRepository)
export const getSession = createGetSession(authRepository)
