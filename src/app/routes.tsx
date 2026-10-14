import { useEffect, useMemo, useState, type FormEvent } from "react"
import { createBrowserRouter, Link, useNavigate } from "react-router"
import { createRecord, getRecords } from "./data"
import { Icon, Layout, RecordCard } from "./components"
import type { VolunteerForm, VolunteerRecord } from "./types"

const heroImage =
  "https://images.unsplash.com/photo-1544928938-6852c1925194?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"

function Home() {
  return (
    <>
      <section className="overflow-hidden bg-[#edf4ea]">
        <div className="page-container grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.04fr_.96fr] lg:py-20">
          <div className="relative z-10">
            <span className="eyebrow">
              <Icon name="spark" className="h-4 w-4" />
              Voluntariado que transforma
            </span>
            <h1 className="mt-6 max-w-[650px] font-display text-[48px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#153b29] sm:text-[62px]">
              Tu tiempo puede cambiar una historia.
            </h1>
            <p className="mt-6 max-w-[560px] text-lg leading-8 text-[#50665a]">
              Conectamos personas con ganas de ayudar con iniciativas que hacen
              una diferencia real en nuestra comunidad.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/registro"
                className="button-primary justify-center px-6 py-3.5"
              >
                Quiero ser voluntario
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                to="/lista"
                className="button-secondary justify-center px-6 py-3.5"
              >
                Ver inscripciones
              </Link>
            </div>
            <div className="mt-11 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["MG", "CR", "LS", "+24"].map((initials, index) => (
                  <span
                    key={initials}
                    className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#edf4ea] text-[10px] font-bold ${
                      index === 3
                        ? "bg-[#1d6642] text-white"
                        : "bg-white text-[#315d45]"
                    }`}
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-[#4f6559]">
                Más personas ya están{" "}
                <strong className="text-[#1c4933]">sumando</strong>
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="absolute -left-8 -top-8 h-36 w-36 rounded-full bg-[#d5e7ce]" />
            <div className="absolute -bottom-10 -right-12 h-56 w-56 rounded-full bg-[#f4dcae]/70" />
            <div className="relative overflow-hidden rounded-[36px_36px_120px_36px] bg-[#dbe6d8] shadow-[0_28px_60px_rgba(44,82,58,0.15)]">
              <img
                src={heroImage}
                alt="Voluntarias trabajando juntas en una actividad comunitaria"
                className="h-[470px] w-full object-cover object-center lg:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#153b29]/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_14px_35px_rgba(32,70,49,0.18)] sm:left-[-30px]">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e4f1df] text-[#286340]">
                <Icon name="heart" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-[#173a29]">
                  Cada acción cuenta
                </p>
                <p className="text-xs text-[#718077]">
                  Juntos llegamos más lejos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Así de sencillo</span>
          <h2 className="section-title mt-5">
            Tres pasos para empezar a sumar
          </h2>
          <p className="mt-4 text-[#65756c]">
            Participar es fácil. Elige cómo ayudar y nosotros te acompañamos en
            el camino.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            [
              "01",
              "Elige una causa",
              "Encuentra una actividad que conecte con tus intereses y disponibilidad.",
              "search",
            ],
            [
              "02",
              "Completa tu inscripción",
              "Cuéntanos un poco sobre ti y confirma la fecha en la que puedes participar.",
              "calendar",
            ],
            [
              "03",
              "Empieza a transformar",
              "Recibe la confirmación y prepárate para vivir una experiencia que deja huella.",
              "heart",
            ],
          ].map(([number, title, text, icon]) => (
            <article
              key={number}
              className="relative rounded-[24px] border border-[#e2e8e1] bg-white p-7"
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-semibold text-[#edf2eb]">
                {number}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf3e7] text-[#286141]">
                <Icon name={icon as "search" | "calendar" | "heart"} />
              </span>
              <h3 className="mt-7 font-display text-xl font-semibold text-[#173a29]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#68766e]">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

const emptyForm: VolunteerForm = {
  nombre: "",
  email: "",
  actividad: "",
  descripcion: "",
  fecha: "",
  categoria: "",
}

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] =
    useState<Partial<Record<keyof VolunteerForm, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState("")

  const minDate = new Date().toISOString().slice(0, 10)

  function validate() {
    const nextErrors: typeof errors = {}
    if (!form.nombre.trim()) nextErrors.nombre = "Ingresa tu nombre completo."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Ingresa un correo válido."
    if (!form.actividad.trim())
      nextErrors.actividad = "Indica la actividad en la que participarás."
    if (!form.categoria) nextErrors.categoria = "Selecciona una categoría."
    if (!form.fecha) nextErrors.fecha = "Selecciona una fecha."
    else if (form.fecha < minDate)
      nextErrors.fecha = "La fecha no puede estar en el pasado."
    if (form.descripcion.trim().length < 20)
      nextErrors.descripcion = "Cuéntanos un poco más (mínimo 20 caracteres)."
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setServerError("")
    if (!validate()) return
    setSubmitting(true)
    try {
      await createRecord(form)
      navigate("/lista", { state: { created: true } })
    } catch (error) {
      setServerError(
        error instanceof Error ? error.message : "Ocurrió un error inesperado.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (name: keyof VolunteerForm) =>
    `form-input ${
      errors[name] ? "border-[#b5483d] focus:border-[#b5483d]" : ""
    }`

  return (
    <section className="bg-[#f5f8f2] py-12 sm:py-16">
      <div className="page-container">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Haz parte del cambio</span>
          <h1 className="section-title mt-5">Inscríbete como voluntario</h1>
          <p className="mt-4 text-[#65756c]">
            Completa tus datos y da el primer paso para hacer una diferencia.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-[#e0e7df] bg-white shadow-[0_18px_60px_rgba(47,78,59,0.09)] lg:grid-cols-[.72fr_1.28fr]">
          <aside className="relative overflow-hidden bg-[#1d5a3d] p-8 text-white sm:p-10">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border-[40px] border-white/5" />
            <div className="relative">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/12">
                <Icon name="people" className="h-6 w-6" />
              </span>
              <h2 className="mt-7 font-display text-2xl font-semibold">
                Tu ayuda importa
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Al registrarte, conectamos tu energía con una causa que necesita
                de personas como tú.
              </p>
              <div className="mt-9 space-y-5">
                {[
                  "Confirmación inmediata",
                  "Tus datos están protegidos",
                  "Puedes consultar tu inscripción",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#a9d29e]/25 text-[#cce8c5]">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
          <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre completo" error={errors.nombre}>
                <input
                  className={inputClass("nombre")}
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Ej. Ana Martínez"
                />
              </Field>
              <Field label="Correo electrónico" error={errors.email}>
                <input
                  type="email"
                  className={inputClass("email")}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ana@email.com"
                />
              </Field>
              <Field label="Actividad" error={errors.actividad}>
                <input
                  className={inputClass("actividad")}
                  value={form.actividad}
                  onChange={(e) =>
                    setForm({ ...form, actividad: e.target.value })
                  }
                  placeholder="Ej. Jornada de reforestación"
                />
              </Field>
              <Field label="Categoría" error={errors.categoria}>
                <select
                  className={inputClass("categoria")}
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                >
                  <option value="">Selecciona una opción</option>
                  {[
                    "Medio ambiente",
                    "Ayuda social",
                    "Educación",
                    "Animales",
                    "Salud",
                    "Cultura",
                  ].map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </Field>
              <Field label="Fecha de participación" error={errors.fecha}>
                <input
                  type="date"
                  min={minDate}
                  className={inputClass("fecha")}
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                />
              </Field>
              <div className="hidden sm:block" />
              <div className="sm:col-span-2">
                <Field
                  label="Cuéntanos por qué quieres participar"
                  error={errors.descripcion}
                >
                  <textarea
                    rows={4}
                    maxLength={300}
                    className={`${inputClass("descripcion")} resize-none`}
                    value={form.descripcion}
                    onChange={(e) =>
                      setForm({ ...form, descripcion: e.target.value })
                    }
                    placeholder="Comparte tu motivación o experiencia..."
                  />
                  <span className="mt-1.5 block text-right text-xs text-[#8b968f]">
                    {form.descripcion.length}/300
                  </span>
                </Field>
              </div>
            </div>
            {serverError && (
              <p className="mt-5 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#9a3d34]">
                {serverError}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="button-primary mt-7 w-full justify-center py-3.5 disabled:cursor-wait disabled:opacity-70"
            >
              {submitting
                ? "Guardando inscripción..."
                : "Confirmar mi inscripción"}
              {!submitting && <Icon name="arrow" className="h-4 w-4" />}
            </button>
            <p className="mt-4 text-center text-xs text-[#829087]">
              Al enviar aceptas el uso de tus datos para gestionar esta
              inscripción.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-[#34483e]">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-xs font-medium text-[#a44036]">
          {error}
        </span>
      )}
    </label>
  )
}

function ListPage() {
  const [records, setRecords] = useState<VolunteerRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Todas")

  useEffect(() => {
    getRecords()
      .then(setRecords)
      .catch((err) =>
        setError(
          err instanceof Error ? err.message : "No pudimos cargar los datos.",
        ),
      )
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(
    () =>
      records.filter((record) => {
        const matchesQuery = `${record.nombre} ${record.actividad}`
          .toLowerCase()
          .includes(query.toLowerCase())
        return (
          matchesQuery &&
          (category === "Todas" || record.categoria === category)
        )
      }),
    [records, query, category],
  )

  return (
    <section className="min-h-[70vh] bg-[#f7f9f5] py-12 sm:py-16">
      <div className="page-container">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Nuestra comunidad</span>
            <h1 className="section-title mt-5">Personas que están sumando</h1>
            <p className="mt-3 text-[#65756c]">
              Conoce las inscripciones y actividades que ya están en marcha.
            </p>
          </div>
          <Link to="/registro" className="button-primary justify-center">
            <Icon name="plus" className="h-4 w-4" />
            Nueva inscripción
          </Link>
        </div>
        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-[#e0e7df] bg-white p-3 sm:flex-row">
          <label className="relative flex-1">
            <Icon
              name="search"
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#75837a]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-xl bg-[#f6f8f5] pl-11 pr-4 text-sm outline-none ring-[#3a7855]/20 focus:ring-3"
              placeholder="Buscar por nombre o actividad..."
            />
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-11 rounded-xl border border-[#e0e7df] bg-white px-4 text-sm font-medium text-[#4e5f56] outline-none sm:min-w-48"
          >
            <option>Todas</option>
            {[
              "Medio ambiente",
              "Ayuda social",
              "Educación",
              "Animales",
              "Salud",
              "Cultura",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="grid place-items-center py-24">
            <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#d9e6db] border-t-[#2d704c]" />
            <p className="mt-4 text-sm text-[#718078]">
              Cargando inscripciones...
            </p>
          </div>
        )}
        {error && (
          <div className="my-10 rounded-2xl border border-[#f0d5d1] bg-[#fff6f5] p-6 text-center text-[#8e4138]">
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="my-10 rounded-3xl border border-dashed border-[#ccd8ce] bg-white py-20 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#edf4eb] text-[#47745a]">
              <Icon name="search" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold">
              No encontramos inscripciones
            </h2>
            <p className="mt-2 text-sm text-[#748179]">
              Prueba con otra búsqueda o registra una nueva participación.
            </p>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="mt-7 flex items-center justify-between text-sm">
              <p className="text-[#718078]">
                <strong className="text-[#30483b]">{filtered.length}</strong>{" "}
                inscripciones encontradas
              </p>
              <p className="hidden items-center gap-2 text-[#718078] sm:flex">
                <Icon name="clock" className="h-4 w-4" />
                Actualizado recientemente
              </p>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {filtered.map((record) => (
                <RecordCard key={record.id} record={record} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <div className="page-container grid min-h-[65vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-8xl font-semibold text-[#dce8da]">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold">
          Esta página no existe
        </h1>
        <Link to="/" className="button-primary mt-7">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "registro", Component: Register },
      { path: "lista", Component: ListPage },
      { path: "*", Component: NotFound },
    ],
  },
])
