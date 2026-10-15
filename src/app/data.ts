import type { Activity, User, VolunteerForm, VolunteerRecord } from "./types"

const STORAGE_KEY = "sumamos-registros"
const USERS_KEY = "sumamos-usuarios"
const SESSION_KEY = "sumamos-sesion"

export const activities: Activity[] = [
  {
    id: "ACT-001",
    nombre: "Reforestación del Parque Central",
    categoria: "Medio ambiente",
    fecha: "2027-04-18",
    lugar: "Parque Central",
    cupos: 24,
    descripcion:
      "Siembra de árboles nativos y recuperación de las zonas verdes del parque.",
  },
  {
    id: "ACT-002",
    nombre: "Apoyo en comedor comunitario",
    categoria: "Ayuda social",
    fecha: "2027-04-22",
    lugar: "Centro Comunitario La Esperanza",
    cupos: 15,
    descripcion:
      "Preparación y entrega de alimentos para familias de la comunidad.",
  },
  {
    id: "ACT-003",
    nombre: "Tutorías para niños",
    categoria: "Educación",
    fecha: "2027-04-26",
    lugar: "Biblioteca Municipal",
    cupos: 12,
    descripcion:
      "Acompañamiento en lectura, escritura y matemáticas para estudiantes.",
  },
  {
    id: "ACT-004",
    nombre: "Jornada de bienestar animal",
    categoria: "Animales",
    fecha: "2027-05-03",
    lugar: "Refugio Huellas",
    cupos: 18,
    descripcion:
      "Apoyo en alimentación, limpieza y socialización de animales rescatados.",
  },
]

type StoredUser = User & { password: string }

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

export function getSession(): User | null {
  const stored = window.localStorage.getItem(SESSION_KEY)
  return stored ? (JSON.parse(stored) as User) : null
}

export function registerUser(user: StoredUser): User {
  const users = JSON.parse(
    window.localStorage.getItem(USERS_KEY) ?? "[]",
  ) as StoredUser[]
  const normalizedEmail = user.email.trim().toLowerCase()
  if (
    users.some((item) => item.email.trim().toLowerCase() === normalizedEmail)
  ) {
    throw new Error("Ya existe una cuenta con este correo.")
  }
  const normalized = { ...user, email: normalizedEmail }
  users.push(normalized)
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users))
  const session = { nombre: normalized.nombre, email: normalized.email }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event("sumamos-auth"))
  return session
}

export function loginUser(email: string, password: string): User {
  const users = JSON.parse(
    window.localStorage.getItem(USERS_KEY) ?? "[]",
  ) as StoredUser[]
  const user = users.find(
    (item) =>
      item.email === email.toLowerCase() && item.password === password,
  )
  if (!user) throw new Error("El correo o la contraseña no son correctos.")
  const session = { nombre: user.nombre, email: user.email }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  window.dispatchEvent(new Event("sumamos-auth"))
  return session
}

export function logoutUser() {
  window.localStorage.removeItem(SESSION_KEY)
  window.dispatchEvent(new Event("sumamos-auth"))
}

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
