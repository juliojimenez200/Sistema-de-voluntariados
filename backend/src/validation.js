const categories = new Set([
  "Medio ambiente",
  "Ayuda social",
  "Educación",
  "Animales",
  "Salud",
  "Cultura",
])

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const datePattern = /^\d{4}-\d{2}-\d{2}$/

function todayAsIso() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60_000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

export function validateRecord(input) {
  const errors = []

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { errors: ["El cuerpo de la petición debe ser un objeto JSON."] }
  }

  const data = {
    nombre: typeof input.nombre === "string" ? input.nombre.trim() : "",
    email:
      typeof input.email === "string" ? input.email.trim().toLowerCase() : "",
    actividad:
      typeof input.actividad === "string" ? input.actividad.trim() : "",
    descripcion:
      typeof input.descripcion === "string" ? input.descripcion.trim() : "",
    fecha: typeof input.fecha === "string" ? input.fecha.trim() : "",
    categoria:
      typeof input.categoria === "string" ? input.categoria.trim() : "",
  }

  if (data.nombre.length < 3 || data.nombre.length > 100) {
    errors.push("El nombre debe tener entre 3 y 100 caracteres.")
  }
  if (!emailPattern.test(data.email) || data.email.length > 150) {
    errors.push("El correo electrónico no tiene un formato válido.")
  }
  if (data.actividad.length < 3 || data.actividad.length > 150) {
    errors.push("La actividad debe tener entre 3 y 150 caracteres.")
  }
  if (data.descripcion.length < 20 || data.descripcion.length > 300) {
    errors.push("La descripción debe tener entre 20 y 300 caracteres.")
  }
  if (
    !datePattern.test(data.fecha) ||
    Number.isNaN(Date.parse(`${data.fecha}T00:00:00Z`))
  ) {
    errors.push("La fecha debe tener el formato AAAA-MM-DD.")
  } else if (data.fecha < todayAsIso()) {
    errors.push("La fecha no puede estar en el pasado.")
  }
  if (!categories.has(data.categoria)) {
    errors.push("El tipo de actividad seleccionado no es válido.")
  }

  return { errors, data }
}
