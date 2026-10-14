import { useEffect, useState, type FormEvent } from "react"

import { createActivityRegistration } from "./activityApi"

import type {
  Activity,
  ActivityRegistrationForm,
  ActivityRegistrationRecord,
  RegistrationSession,
} from "./types"

const activities: Activity[] = [
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

type ActivityCatalogProps = {
  onRegister: (activityId: string) => void
}

export function ActivityCatalog({ onRegister }: ActivityCatalogProps) {
  return (
    <section className="min-h-[70vh] bg-[#f7f9f5] py-12 sm:py-16">
      <div className="page-container">
        <span className="eyebrow">Oportunidades disponibles</span>
        <h1 className="section-title mt-5">Elige dónde quieres sumar</h1>
        <p className="mt-3 text-[#65756c]">
          Consulta las próximas jornadas, sus fechas y cupos antes de
          inscribirte.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {activities.map((activity) => (
            <article
              key={activity.id}
              className="rounded-[24px] border border-[#e0e7df] bg-white p-6 shadow-[0_8px_30px_rgba(47,78,59,0.06)]"
            >
              <div className="flex justify-between">
                <span className="rounded-full bg-[#e5f1e2] px-3 py-1.5 text-xs font-bold text-[#286141]">
                  {activity.categoria}
                </span>
                <span className="text-xs font-semibold text-[#65756c]">
                  {activity.cupos} cupos
                </span>
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold text-[#173a29]">
                {activity.nombre}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#68766e]">
                {activity.descripcion}
              </p>
              <div className="mt-6 space-y-2 border-t border-[#e8ede7] pt-5 text-sm text-[#52645b]">
                <p>Fecha: {activity.fecha}</p>
                <p>Lugar: {activity.lugar}</p>
              </div>
              <button
                type="button"
                onClick={() => onRegister(activity.id)}
                className="button-primary mt-6 w-full justify-center"
              >
                Reservar mi cupo
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

type ActivityRegistrationProps = {
  session: RegistrationSession | null

  initialActivityId?: string

  onLoginRequired: () => void

  onRegistered: (record: ActivityRegistrationRecord) => void
}

export function ActivityRegistration({
  session,

  initialActivityId,

  onLoginRequired,

  onRegistered,
}: ActivityRegistrationProps) {
  const [activityId, setActivityId] = useState(initialActivityId ?? "")

  const [descripcion, setDescripcion] = useState("")

  const [error, setError] = useState("")

  const [submitting, setSubmitting] = useState(false)

  const selected = activities.find((item) => item.id === activityId)

  useEffect(() => {
    setActivityId(initialActivityId ?? "")
  }, [initialActivityId])

  if (!session) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#f5f8f2] p-6">
        <div className="max-w-lg rounded-[28px] bg-white p-10 text-center">
          <h1 className="section-title">Primero inicia sesión</h1>
          <p className="mt-3 text-[#65756c]">
            Crea tu cuenta o ingresa para reservar un cupo.
          </p>
          <button
            type="button"
            onClick={onLoginRequired}
            className="button-primary mt-7"
          >
            Ingresar o crear cuenta
          </button>
        </div>
      </section>
    )
  }

  const currentSession = session

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    if (!selected) {
      setError("Selecciona una actividad.")

      return
    }

    if (descripcion.trim().length < 20) {
      setError("Escribe una motivación de al menos 20 caracteres.")

      return
    }

    if (descripcion.trim().length > 300) {
      setError("La motivación no puede superar los 300 caracteres.")

      return
    }

    const form: ActivityRegistrationForm = {
      nombre: currentSession.nombre,

      email: currentSession.email,

      actividad: selected.nombre,

      categoria: selected.categoria,

      fecha: selected.fecha,

      descripcion: descripcion.trim(),
    }

    setSubmitting(true)

    try {
      const record = await createActivityRegistration(form)

      onRegistered(record)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No fue posible guardar la inscripción.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-[#f5f8f2] py-14">
      <div className="page-container">
        <div className="mx-auto max-w-3xl rounded-[28px] bg-white p-7 shadow-[0_18px_60px_rgba(47,78,59,0.09)] sm:p-10">
          <h1 className="section-title">Reserva tu cupo</h1>
          <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#34483e]">
                Participante
              </span>
              <input className="form-input" value={session.nombre} readOnly />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#34483e]">
                Correo
              </span>
              <input className="form-input" value={session.email} readOnly />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#34483e]">
                Actividad
              </span>
              <select
                className="form-input"
                value={activityId}
                onChange={(event) => setActivityId(event.target.value)}
                required
              >
                <option value="">Selecciona una actividad</option>
                {activities.map((activity) => (
                  <option key={activity.id} value={activity.id}>
                    {activity.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-[#34483e]">
                Lugar
              </span>
              <input
                className="form-input"
                value={selected?.lugar ?? ""}
                readOnly
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-[#34483e]">
                Motivación
              </span>
              <textarea
                className="form-input resize-none"
                minLength={20}
                maxLength={300}
                value={descripcion}
                onChange={(event) => setDescripcion(event.target.value)}
                required
              />
            </label>
            {error && (
              <p
                role="alert"
                className="sm:col-span-2 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#9a3d34]"
              >
                {error}
              </p>
            )}
            <button
              className="button-primary justify-center sm:col-span-2"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Enviando inscripción..."
                : "Confirmar mi inscripción"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
