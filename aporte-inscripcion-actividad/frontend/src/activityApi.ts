import type {
  ActivityRegistrationForm,
  ActivityRegistrationRecord,
} from "./types"

function getApiUrl() {
  const value = import.meta.env.VITE_API_URL

  return value?.replace(/\/$/, "")
}

async function readApiError(response: Response) {
  try {
    const body = (await response.json()) as {
      error?: string

      detalles?: string[]
    }

    if (body.detalles?.length) return body.detalles.join(" ")

    return body.error ?? "No pudimos guardar la inscripción."
  } catch {
    return "No pudimos guardar la inscripción."
  }
}

export async function createActivityRegistration(
  form: ActivityRegistrationForm,
): Promise<ActivityRegistrationRecord> {
  const apiUrl = getApiUrl()

  if (!apiUrl) {
    throw new Error("Configura VITE_API_URL para conectar con la API.")
  }

  const response = await fetch(`${apiUrl}/registros`, {
    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify(form),
  })

  if (!response.ok) {
    throw new Error(await readApiError(response))
  }

  return response.json()
}
