export type VolunteerRecord = {
  id: string
  nombre: string
  email: string
  actividad: string
  descripcion: string
  fecha: string
  categoria: string
  estado: "Confirmada"
  createdAt: string
}

export type VolunteerForm = Omit<VolunteerRecord, "id" | "estado" | "createdAt">

export type User = {
  nombre: string
  email: string
}

export type Activity = {
  id: string
  nombre: string
  categoria: string
  fecha: string
  lugar: string
  cupos: number
  descripcion: string
}
