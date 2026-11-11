import { applyDefaultRequestInit, toApiError } from "@/app/infrastructure/http/interceptors"

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, applyDefaultRequestInit(init))
  const body = await parseBody(response)

  if (!response.ok || isFailedStatus(body)) {
    throw toApiError(response.status, body)
  }

  return body as T
}

async function parseBody(response: Response): Promise<unknown> {
  const text = await response.text()
  if (!text) return {}
  try {
    return JSON.parse(text)
  } catch {
    return { status: "Error", message: "Respuesta inválida del servidor" }
  }
}

function isFailedStatus(body: unknown): boolean {
  return typeof body === "object" && body !== null && "status" in body && body.status === "Error"
}
