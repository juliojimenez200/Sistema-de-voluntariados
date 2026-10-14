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
