import { useState, type ComponentProps, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { cn } from "cn"

import { Button } from "@/app/presentation/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/presentation/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/app/presentation/components/ui/field"
import { Input } from "@/app/presentation/components/ui/input"
import { useAuth } from "@/app/presentation/hooks/useAuth"

export function LoginForm({
  className,
  ...props
}: ComponentProps<"div">) {
  const { login, isLoggingIn, loginError } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    const formData = new FormData(event.currentTarget)

    try {
      await login({
        documento: String(formData.get("documento") ?? ""),
        password: String(formData.get("password") ?? ""),
      })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "No se pudo iniciar sesión")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border-0 bg-[#f2f2f2] shadow-[5px_5px_20px_rgba(0,0,0,0.35)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-[#4d1658]">
            INICIAR SESION
          </CardTitle>
          <CardDescription>Ingresa tus datos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="documento">NIP</FieldLabel>
                <Input
                  id="documento"
                  name="documento"
                  type="number"
                  placeholder="Número de identificación personal..."
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña..."
                  required
                />
              </Field>
              {(formError || loginError) && (
                <p className="text-center text-sm text-destructive" role="alert">
                  {formError || loginError?.message}
                </p>
              )}
              <Field>
                <Button
                  type="submit"
                  className="w-full bg-[#4d1658] hover:bg-[#571a64]"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? "Ingresando..." : "Ingresar"}
                </Button>
                <FieldDescription className="text-center text-[10px]">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="text-[#4d1658]">
                    Regístrate aquí
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
