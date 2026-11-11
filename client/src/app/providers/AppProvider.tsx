import { BrowserRouter } from "react-router-dom"
import { QueryProvider } from "@/app/providers/QueryProvider"
import { AppRouter } from "@/app/presentation/routes/AppRouter"

export function AppProvider() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  )
}
