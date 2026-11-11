export type ApiStatus = "OK" | "Error"

export type ApiErrorBody = {
  status: "Error"
  message: string
}

export type ApiSuccessBody = {
  status: "OK"
  message?: string
  redirect?: string
}
