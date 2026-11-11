import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { getSession, loginUser, logoutUser, registerUser } from "@/app/application/use-cases/auth"
import type { LoginDTO } from "@/app/application/dto/auth/LoginDTO"
import type { RegisterDTO } from "@/app/application/dto/auth/RegisterDTO"
import { QUERY_KEYS } from "@/app/shared/constants/api"

export function useAuth() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const sessionQuery = useQuery({
    queryKey: QUERY_KEYS.session,
    queryFn: getSession,
  })

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginDTO) => loginUser(credentials),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.session })
      const redirect = result.redirect === "/inicio" ? "/session" : result.redirect || "/admin"
      navigate(redirect)
    },
  })

  const registerMutation = useMutation({
    mutationFn: (data: RegisterDTO) => registerUser(data),
    onSuccess: () => {
      navigate("/login")
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.session })
      navigate("/login")
    },
  })

  return {
    session: sessionQuery.data,
    isSessionLoading: sessionQuery.isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}
