import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/app/presentation/hooks/useAuth"
import { Loading } from "@/app/presentation/components/shared/Loading"

export function ProtectedRoute() {
  const { session, isSessionLoading } = useAuth()

  if (isSessionLoading) {
    return <Loading />
  }

  if (!session?.authenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
