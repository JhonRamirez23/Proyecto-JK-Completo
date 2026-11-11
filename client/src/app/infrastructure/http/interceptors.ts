import type { ApiErrorBody } from "@/app/shared/types/api"

export class ApiError extends Error {
  readonly statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.name = "ApiError"
    this.statusCode = statusCode
  }
}

export function applyDefaultRequestInit(init?: RequestInit): RequestInit {
  return {
    credentials: "include",
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  }
}

export function toApiError(statusCode: number, body: unknown): ApiError {
  const message =
    isErrorBody(body) && body.message
      ? body.message
      : "Error interno del servidor"
  return new ApiError(message, statusCode)
}

function isErrorBody(body: unknown): body is ApiErrorBody {
  return (
    typeof body === "object" &&
    body !== null &&
    "status" in body &&
    body.status === "Error"
  )
}
