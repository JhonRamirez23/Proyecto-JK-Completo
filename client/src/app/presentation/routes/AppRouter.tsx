import { Navigate, Route, Routes } from "react-router-dom"
import { AuthLayout } from "@/app/presentation/components/layout/AuthLayout"
import { MainLayout } from "@/app/presentation/components/layout/MainLayout"
import { ProtectedRoute } from "@/app/presentation/routes/ProtectedRoute"
import { AdminPage } from "@/app/presentation/pages/dashboard/AdminPage"
import { LoginPage } from "@/app/presentation/pages/auth/LoginPage"
import { RegisterPage } from "@/app/presentation/pages/auth/RegisterPage"
import { WelcomePage } from "@/app/presentation/pages/welcome/WelcomePage"

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/inicio" element={<WelcomePage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/session" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
