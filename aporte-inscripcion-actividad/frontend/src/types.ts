export type Activity = {
  id: string

  nombre: string

  categoria: string

  fecha: string

  lugar: string

  cupos: number

  descripcion: string
}

export type RegistrationSession = {
  nombre: string

  email: string
}

export type ActivityRegistrationForm = {
  nombre: string

  email: string

  actividad: string

  descripcion: string

  fecha: string

  categoria: string
}

export type ActivityRegistrationRecord = ActivityRegistrationForm & {
  id: string

  estado: "Confirmada"

  createdAt: string
}
