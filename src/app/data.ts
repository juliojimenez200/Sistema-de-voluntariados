import type { VolunteerForm, VolunteerRecord } from "./types"

const STORAGE_KEY = "sumamos-registros"

const initialRecords: VolunteerRecord[] = [
  {
    id: "VOL-2841",
    nombre: "María González",
    email: "maria.gonzalez@email.com",
    actividad: "Reforestación del Parque Central",
    descripcion:
      "Quiero aportar a la recuperación de las áreas verdes de mi comunidad.",
    fecha: "2026-04-18",
    categoria: "Medio ambiente",
    estado: "Confirmada",
    createdAt: "2026-03-10T10:00:00.000Z",
  },
  {
    id: "VOL-1975",
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@email.com",
    actividad: "Apoyo en comedor comunitario",
    descripcion:
      "Tengo experiencia en cocina y disponibilidad para apoyar durante toda la jornada.",
    fecha: "2026-04-22",
    categoria: "Ayuda social",
    estado: "Confirmada",
    createdAt: "2026-03-09T16:30:00.000Z",
  },
  {
    id: "VOL-3158",
    nombre: "Laura Ramírez",
    email: "laura.ramirez@email.com",
    actividad: "Tutorías para niños",
    descripcion:
      "Puedo brindar apoyo en lectura y matemáticas a estudiantes de primaria.",
    fecha: "2026-04-26",
    categoria: "Educación",
    estado: "Confirmada",
    createdAt: "2026-03-08T14:20:00.000Z",
  },
]

const wait = (ms = 450) =>
  new Promise<void>((resolve) => window.setTimeout(resolve, ms))

function readLocalRecords(): VolunteerRecord[] {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialRecords))
    return initialRecords
  }
  return JSON.parse(stored) as VolunteerRecord[]
}

function getApiUrl() {
  const value = import.meta.env.VITE_API_URL as string | undefined
  return value?.replace(/\/$/, "")
}

async function readApiError(response: Response, fallback: string) {
  try {
    const body = (await response.json()) as {
      error?: string
      detalles?: string[]
    }
    if (body.detalles?.length) return body.detalles.join(" ")
    return body.error ?? fallback
  } catch {
    return fallback
  }
}

export async function getRecords(): Promise<VolunteerRecord[]> {
  const apiUrl = getApiUrl()
  if (apiUrl) {
    const response = await fetch(`${apiUrl}/registros`)
    if (!response.ok) {
      throw new Error(
        await readApiError(response, "No pudimos obtener los registros."),
      )
    }
    return response.json()
  }
  await wait()
  return readLocalRecords()
}

export async function createRecord(
  form: VolunteerForm,
): Promise<VolunteerRecord> {
  const apiUrl = getApiUrl()
  if (apiUrl) {
    const response = await fetch(`${apiUrl}/registros`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (!response.ok) {
      throw new Error(
        await readApiError(response, "No pudimos guardar la inscripción."),
      )
    }
    return response.json()
  }

  await wait(650)
  const record: VolunteerRecord = {
    ...form,
    id: `VOL-${Math.floor(1000 + Math.random() * 9000)}`,
    estado: "Confirmada",
    createdAt: new Date().toISOString(),
  }
  const records = readLocalRecords()
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...records]))
  return record
}
