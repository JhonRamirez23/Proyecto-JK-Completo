import { Button } from "@/app/presentation/components/ui/button"
import { useAuth } from "@/app/presentation/hooks/useAuth"

export function AdminPage() {
  const { session, logout, isLoggingOut } = useAuth()

  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col justify-center gap-6 p-6">
      <h1 className="text-2xl font-semibold">Panel de administración</h1>
      <p>
        Sesión activa{session?.user?.documento ? ` para ${session.user.documento}` : ""}.
      </p>
      <Button type="button" onClick={() => logout()} disabled={isLoggingOut}>
        {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
      </Button>
    </main>
  )
}
