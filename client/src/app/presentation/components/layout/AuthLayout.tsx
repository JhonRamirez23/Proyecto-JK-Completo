import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center bg-[linear-gradient(151deg,#4d1658_0%,#b41c80_51%,#e40d6e_100%)] p-4 sm:p-6">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </main>
  )
}
