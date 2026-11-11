import { useState, type ComponentProps, type FormEvent } from "react"
import { Link } from "react-router-dom"

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

export function SignupForm({ ...props }: ComponentProps<typeof Card>) {
  const { register, isRegistering, registerError } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    const formData = new FormData(event.currentTarget)

    try {
      await register({
        usuario: String(formData.get("usuario") ?? ""),
        documento: String(formData.get("documento") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      })
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "No se pudo registrar")
    }
  }

  return (
    <Card
      className="border-0 bg-[#f2f2f2] shadow-[5px_5px_20px_rgba(0,0,0,0.35)]"
      {...props}
    >
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-semibold text-[#4d1658]">
          Crea una cuenta
        </CardTitle>
        <CardDescription>
          Registra tus datos en el formulario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="usuario">Usuario</FieldLabel>
              <Input
                id="usuario"
                name="usuario"
                type="text"
                placeholder="Ingrese su nombre..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="documento">NIP</FieldLabel>
              <Input
                id="documento"
                name="documento"
                type="number"
                placeholder="Ingrese su número de identificación..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Correo</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su correo..."
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Crea una contraseña..."
                required
              />
            </Field>
            {(formError || registerError) && (
              <p className="text-center text-sm text-destructive" role="alert">
                {formError || registerError?.message}
              </p>
            )}
            <Field>
              <Button
                type="submit"
                className="w-full bg-[#4d1658] hover:bg-[#571a64]"
                disabled={isRegistering}
              >
                {isRegistering ? "Registrando..." : "Registrar"}
              </Button>
              <FieldDescription className="text-center">
                ¿Ya tienes una cuenta?{" "} <br />
                <Link to="/login" className="text-[#4d1658]">
                  Inicia sesión aquí
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
