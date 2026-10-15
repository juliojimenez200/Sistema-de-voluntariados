import { useEffect, useMemo, useState, type FormEvent } from "react"
import { createBrowserRouter, Link, useNavigate, useSearchParams } from "react-router"
import { activities, createRecord, getRecords, getSession, loginUser, registerUser } from "./data"
import { Icon, Layout, RecordCard } from "./components"
import type { VolunteerForm, VolunteerRecord } from "./types"

function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#edf4ea]">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[440px] w-[440px] rounded-full border border-[#dce7dc]" />
        <div className="pointer-events-none absolute -right-16 -top-24 h-[310px] w-[310px] rounded-full border border-[#dce7dc]" />
        <div className="page-container relative grid min-h-[570px] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="py-3">
            <span className="eyebrow"><Icon name="spark" className="h-4 w-4" />Voluntariado que transforma</span>
            <h1 className="mt-6 max-w-[650px] font-display text-[46px] font-semibold leading-[1.04] tracking-[-0.045em] text-[#153b29] sm:text-[62px] lg:text-[68px]">
              Tu tiempo puede cambiar una historia.
            </h1>
            <p className="mt-6 max-w-[540px] text-base leading-8 text-[#50665a] sm:text-lg">
              Conectamos personas con ganas de ayudar con iniciativas que hacen una diferencia real en nuestra comunidad.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link to="/actividades" className="button-primary justify-center px-6 py-3.5">Explorar actividades <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link to="/lista" className="button-secondary justify-center px-6 py-3.5">Ver inscripciones</Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#dce7dc] pt-6 text-sm text-[#52645b]">
              <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#1d6642]" />Actividades para todos</span>
              <span className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-[#1d6642]" />Inscripción sencilla</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[500px] lg:justify-self-end">
            <div className="absolute -bottom-5 -left-5 h-full w-full rounded-[30px] border border-[#cbdacb]" />
            <div className="relative overflow-hidden rounded-[30px] bg-[#1d6642] p-7 text-white shadow-[0_28px_60px_rgba(44,82,58,0.15)] sm:p-9">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10"><Icon name="heart" className="h-6 w-6" /></span>
                <span className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80">Comunidad Sumamos</span>
              </div>
              <p className="mt-10 font-display text-[34px] leading-tight sm:text-[40px]">Cada acción cuenta.</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/75">Encuentra una causa que te inspire y convierte tus ganas de ayudar en algo real.</p>
              <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.08] p-5">
                <div className="flex items-center justify-between gap-3">
                  <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/60">Para empezar</p><p className="mt-1 font-semibold">Explora las oportunidades</p></div>
                  <Icon name="arrow" className="h-5 w-5 shrink-0 text-white/80" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {activities.slice(0, 3).map((activity, index) => <span key={activity.id} className={`grid h-9 w-9 place-items-center rounded-full border-2 border-[#1d6642] ${index === 0 ? "bg-[#e5f1e2] text-[#286141]" : index === 1 ? "bg-[#d5e4d4] text-[#286141]" : "bg-[#c5d8c5] text-[#286141]"}`}><Icon name={index === 0 ? "leaf" : index === 1 ? "heart" : "people"} className="h-4 w-4" /></span>)}
                  <span className="ml-1 text-xs text-white/70">Causas que esperan por ti</span>
                </div>
              </div>
            </div>
            <div className="relative mt-4 flex items-center justify-between rounded-2xl border border-[#dce7dc] bg-white px-5 py-4 shadow-[0_8px_24px_rgba(47,78,59,0.06)]">
              <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e5f1e2] text-[#286141]"><Icon name="calendar" className="h-5 w-5" /></span><div><p className="text-xs text-[#829087]">Hay oportunidades disponibles</p><p className="mt-0.5 text-sm font-bold text-[#263c31]">Elige por dónde comenzar</p></div></div>
              <span className="font-display text-2xl text-[#1d6642]">{activities.length}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="page-container py-16 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><span className="eyebrow">Así de sencillo</span><h2 className="section-title mt-5">Elige, inscríbete y empieza a sumar</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#65756c]">Tu próxima experiencia de voluntariado está a unos pasos.</p></div>
          <Link to="/actividades" className="button-secondary self-start sm:self-auto">Ver todas las actividades <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {[
            { number: "01", title: "Encuentra tu causa", description: "Explora actividades y conoce cómo puedes aportar.", icon: "search" as const },
            { number: "02", title: "Reserva tu lugar", description: "Crea tu cuenta y confirma tu inscripción en minutos.", icon: "calendar" as const },
            { number: "03", title: "Haz la diferencia", description: "Comparte tu tiempo y forma parte del cambio.", icon: "heart" as const },
          ].map((step) => (
            <article key={step.number} className="rounded-[22px] border border-[#e1e8e0] bg-white p-6 shadow-[0_5px_22px_rgba(47,78,59,0.04)]">
              <div className="flex items-center justify-between"><span className="font-display text-2xl text-[#b0c2b1]">{step.number}</span><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ea] text-[#286141]"><Icon name={step.icon} className="h-5 w-5" /></span></div>
              <h3 className="mt-5 font-display text-xl text-[#173a29]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#68766e]">{step.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

function Field({ label, error, errorId, children }: { label: string; error?: string; errorId?: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold text-[#34483e]">{label}</span>{children}{error && <span id={errorId} className="mt-1.5 block text-xs font-medium text-[#a44036]">{error}</span>}</label>
}

function ActivitiesPage() {
  return (
    <section className="min-h-[75vh] bg-[#f7f9f5]">
      <div className="border-b border-[#e3eae1] bg-[#edf4ea]">
        <div className="page-container grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <span className="eyebrow"><Icon name="leaf" className="h-4 w-4" />Tu comunidad te espera</span>
            <h1 className="section-title mt-5 max-w-2xl">Encuentra una forma de sumar.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#52645b]">
              Explora iniciativas cercanas y elige la que mejor conecte con tu tiempo e intereses.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-[#dce7dc] bg-white/80 px-5 py-4 shadow-[0_8px_24px_rgba(47,78,59,0.05)]">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e5f1e2] text-[#286141]"><Icon name="people" /></span>
            <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#718077]">Disponibles ahora</p><p className="mt-0.5 font-display text-2xl text-[#173a29]">{activities.length} actividades</p></div>
          </div>
        </div>
      </div>
      <div className="page-container py-10 sm:py-12">
        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 className="text-lg font-bold text-[#263c31]">Próximas oportunidades</h2><p className="mt-1 text-sm text-[#718077]">Elige una actividad para conocer los detalles y reservar.</p></div>
          <span className="text-sm font-semibold text-[#65756c]">{activities.length} opciones</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {activities.map((activity, index) => (
            <article key={activity.id} className="group flex flex-col rounded-[24px] border border-[#e0e7df] bg-white p-6 shadow-[0_5px_22px_rgba(47,78,59,0.045)] transition duration-200 hover:-translate-y-1 hover:border-[#cbdacb] hover:shadow-[0_16px_36px_rgba(47,78,59,0.09)] sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#edf4ea] font-display text-lg text-[#286141]">0{index + 1}</span>
                <span className="rounded-full border border-[#dce7dc] bg-[#f7f9f5] px-3 py-1.5 text-xs font-bold text-[#286141]">{activity.categoria}</span>
              </div>
              <h3 className="mt-5 font-display text-[26px] leading-tight text-[#173a29]">{activity.nombre}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-[#68766e]">{activity.descripcion}</p>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#e8ede7] pt-5">
                <div className="flex items-start gap-2.5 text-sm text-[#52645b]"><Icon name="calendar" className="mt-0.5 h-4 w-4 shrink-0 text-[#39734f]" /><div><p className="text-xs text-[#829087]">Fecha</p><p className="mt-0.5 font-semibold">{new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${activity.fecha}T00:00:00Z`))}</p></div></div>
                <div className="flex items-start gap-2.5 text-sm text-[#52645b]"><Icon name="people" className="mt-0.5 h-4 w-4 shrink-0 text-[#39734f]" /><div><p className="text-xs text-[#829087]">Cupos</p><p className="mt-0.5 font-semibold">{activity.cupos} disponibles</p></div></div>
                <div className="col-span-2 flex items-start gap-2.5 text-sm text-[#52645b]"><Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-[#39734f]" /><div><p className="text-xs text-[#829087]">Punto de encuentro</p><p className="mt-0.5 font-semibold">{activity.lugar}</p></div></div>
              </div>
              <Link to={`/registro?actividad=${activity.id}`} className="button-primary mt-6 w-full justify-center">
                Reservar mi cupo <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function AccessPage() {
  const navigate = useNavigate(); const [mode, setMode] = useState<"login" | "register">("login"); const [nombre, setNombre] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [confirmPassword, setConfirmPassword] = useState(""); const [error, setError] = useState(""); const [fieldErrors, setFieldErrors] = useState<Partial<Record<"nombre" | "email" | "password" | "confirmPassword", string>>>({}); const [isSubmitting, setIsSubmitting] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (isSubmitting) return
    setError("")
    const errors: typeof fieldErrors = {}
    const normalizedEmail = email.trim()
    if (!normalizedEmail) errors.email = "Ingresa tu correo electrónico."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) errors.email = "Ingresa un correo válido."
    if (!password) errors.password = "Ingresa tu contraseña."
    else if (mode === "register" && password.length < 8) errors.password = "La contraseña debe tener al menos 8 caracteres."
    else if (mode === "register" && !/[\p{P}\p{S}]/u.test(password)) errors.password = "Incluye al menos un carácter especial, por ejemplo: ! o #."
    if (mode === "register") {
      if (nombre.trim().length < 3) errors.nombre = "Ingresa tu nombre completo (mínimo 3 caracteres)."
      if (!confirmPassword) errors.confirmPassword = "Confirma tu contraseña."
      else if (confirmPassword !== password) errors.confirmPassword = "Las contraseñas no coinciden."
    }
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setIsSubmitting(true)
    try {
      await new Promise<void>((resolve) => window.setTimeout(resolve, 400))
      if (mode === "register") registerUser({ nombre: nombre.trim(), email: normalizedEmail, password })
      else loginUser(normalizedEmail, password)
      navigate("/actividades")
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible completar el acceso.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <section className="bg-[#edf4ea] px-4 py-10 sm:py-16">
      <div className="mx-auto grid min-h-[560px] w-full max-w-5xl overflow-hidden rounded-[30px] border border-[#dce7dc] bg-white shadow-[0_24px_70px_rgba(42,78,56,0.12)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#1d6642] p-8 text-white sm:p-10 lg:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
          <div className="relative">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Icon name="heart" className="h-6 w-6" /></span>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-white/65">Sumamos comunidad</p>
            <h1 className="mt-4 max-w-sm font-display text-4xl leading-[1.08] tracking-[-0.025em] sm:text-[46px]">
              {mode === "login" ? "Qué bueno tenerte de vuelta." : "Tu próxima gran acción empieza aquí."}
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
              {mode === "login" ? "Entra y encuentra nuevas maneras de hacer la diferencia en tu comunidad." : "Crea tu cuenta y conecta con iniciativas que necesitan tus ganas de ayudar."}
            </p>
          </div>
          <div className="relative mt-12 border-t border-white/20 pt-5">
            <p className="font-display text-xl">Pequeñas acciones. Grandes cambios.</p>
            <p className="mt-1 text-xs text-white/65">Cada persona puede aportar algo único.</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            <span className="eyebrow"><Icon name="spark" className="h-4 w-4" />Un espacio para hacer el bien</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-[-0.025em] text-[#173a29]">{mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}</h2>
            <p className="mt-2 text-sm leading-6 text-[#718077]">{mode === "login" ? "Ingresa tus datos para continuar." : "Completa tus datos para unirte a la comunidad."}</p>
            <div className="mt-7 grid grid-cols-2 rounded-xl bg-[#f0f4ee] p-1">
              <button type="button" onClick={() => { setMode("login"); setError(""); setFieldErrors({}) }} className={`rounded-lg px-3 py-3 text-sm font-bold ${mode === "login" ? "bg-white text-[#1d6642] shadow-sm" : "text-[#65756c]"}`}>Iniciar sesión</button>
              <button type="button" onClick={() => { setMode("register"); setError(""); setFieldErrors({}) }} className={`rounded-lg px-3 py-3 text-sm font-bold ${mode === "register" ? "bg-white text-[#1d6642] shadow-sm" : "text-[#65756c]"}`}>Crear cuenta</button>
            </div>
            <form onSubmit={submit} noValidate aria-busy={isSubmitting} className="mt-6 space-y-4">
              {mode === "register" && <Field label="Nombre completo" error={fieldErrors.nombre} errorId="nombre-error"><input id="nombre" name="nombre" required autoComplete="name" aria-invalid={Boolean(fieldErrors.nombre)} aria-describedby={fieldErrors.nombre ? "nombre-error" : undefined} className="form-input" value={nombre} onChange={(e) => { setNombre(e.target.value); setFieldErrors((current) => ({ ...current, nombre: undefined })) }} placeholder="Tu nombre" /></Field>}
              <Field label="Correo electrónico" error={fieldErrors.email} errorId="email-error"><input id="email" name="email" type="email" required autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} className="form-input" value={email} onChange={(e) => { setEmail(e.target.value); setFieldErrors((current) => ({ ...current, email: undefined })) }} placeholder="nombre@correo.com" /></Field>
              <Field label="Contraseña" error={fieldErrors.password} errorId="password-error"><input id="password" name="password" type="password" required autoComplete={mode === "login" ? "current-password" : "new-password"} aria-invalid={Boolean(fieldErrors.password)} aria-describedby={fieldErrors.password ? "password-error" : undefined} className="form-input" value={password} onChange={(e) => { setPassword(e.target.value); setFieldErrors((current) => ({ ...current, password: undefined, confirmPassword: undefined })) }} placeholder={mode === "register" ? "Mínimo 8 caracteres y un símbolo" : "Ingresa tu contraseña"} /></Field>
              {mode === "register" && <Field label="Confirmar contraseña" error={fieldErrors.confirmPassword} errorId="confirm-password-error"><input id="confirm-password" name="confirmPassword" type="password" required autoComplete="new-password" aria-invalid={Boolean(fieldErrors.confirmPassword)} aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined} className="form-input" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((current) => ({ ...current, confirmPassword: undefined })) }} placeholder="Escribe nuevamente tu contraseña" /></Field>}
              {error && <p role="alert" className="rounded-xl bg-[#fff0ee] p-3 text-sm text-[#9a3d34]">{error}</p>}
              <button className="button-primary mt-2 min-h-12 w-full justify-center rounded-xl" type="submit" aria-live="polite">{isSubmitting ? "Procesando tus datos..." : mode === "login" ? "Ingresar" : "Crear mi cuenta"}{!isSubmitting && <Icon name="arrow" className="h-4 w-4" />}</button>
            </form>
            <p className="mt-5 text-center text-xs leading-5 text-[#829087]">Versión académica: tu sesión se guarda en este navegador.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Register() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const session = getSession()
  const initial = activities.find((item) => item.id === params.get("actividad"))
  const [form, setForm] = useState<VolunteerForm>({ nombre: session?.nombre ?? "", email: session?.email ?? "", actividad: initial?.nombre ?? "", categoria: initial?.categoria ?? "", fecha: initial?.fecha ?? "", descripcion: "" })
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"actividad" | "descripcion", string>>>({})
  const [reviewing, setReviewing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  if (!session) return <section className="grid min-h-[70vh] place-items-center bg-[#f5f8f2] p-6"><div className="max-w-lg rounded-[28px] bg-white p-10 text-center"><h1 className="section-title">Primero inicia sesión</h1><p className="mt-3 text-[#65756c]">Crea tu cuenta o ingresa para reservar un cupo.</p><Link to="/acceso" className="button-primary mt-7">Ingresar o crear cuenta</Link></div></section>
  const selected = activities.find((item) => item.nombre === form.actividad)
  function getSessionBoundForm(): VolunteerForm | null {
    const currentSession = getSession()
    if (!currentSession) return null

    const nombre = currentSession.nombre.trim()
    const email = currentSession.email.trim().toLowerCase()
    if (
      !nombre ||
      !email ||
      form.nombre.trim() !== nombre ||
      form.email.trim().toLowerCase() !== email
    ) {
      return null
    }

    return { ...form, nombre, email }
  }
  function choose(id: string) {
    const item = activities.find((activity) => activity.id === id)
    setForm({ ...form, actividad: item?.nombre ?? "", categoria: item?.categoria ?? "", fecha: item?.fecha ?? "" })
    setFieldErrors((current) => ({ ...current, actividad: undefined }))
    setError("")
  }
  function reviewSubmission(event: FormEvent) {
    event.preventDefault()
    setError("")
    const sessionBoundForm = getSessionBoundForm()
    if (!sessionBoundForm) {
      setError("El nombre y correo deben coincidir con los de tu cuenta. Cierra sesión e ingresa nuevamente.")
      return
    }
    const errors: typeof fieldErrors = {}
    if (!form.actividad || !selected) errors.actividad = "Selecciona una actividad válida."
    const today = new Date()
    const todayIso = new Date(today.getTime() - today.getTimezoneOffset() * 60_000).toISOString().slice(0, 10)
    if (form.fecha && form.fecha < todayIso) errors.actividad = "Esta actividad ya pasó. Selecciona otra fecha."
    const motivation = form.descripcion.trim()
    if (motivation.length < 20) errors.descripcion = "Escribe una motivación de al menos 20 caracteres."
    else if (motivation.length > 300) errors.descripcion = "La motivación no puede superar los 300 caracteres."
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return
    setForm({ ...sessionBoundForm, descripcion: motivation })
    setReviewing(true)
  }
  async function confirmSubmission() {
    if (isSubmitting) return
    const sessionBoundForm = getSessionBoundForm()
    if (!sessionBoundForm) {
      setError("El nombre y correo deben coincidir con los de tu cuenta. Cierra sesión e ingresa nuevamente.")
      setReviewing(false)
      return
    }
    setIsSubmitting(true)
    setError("")
    try {
      const records = await getRecords()
      const duplicate = records.some((record) =>
        record.email.trim().toLowerCase() === sessionBoundForm.email &&
        record.actividad.trim().toLocaleLowerCase() === sessionBoundForm.actividad.trim().toLocaleLowerCase(),
      )
      if (duplicate) {
        setReviewing(false)
        setError("Ya tienes una inscripción para esta actividad.")
        return
      }
      await createRecord(sessionBoundForm)
      navigate("/lista")
    } catch (err) {
      setError(err instanceof Error ? err.message : "No fue posible guardar la inscripción.")
    } finally {
      setIsSubmitting(false)
    }
  }
  return <section className="bg-[#f5f8f2] py-14"><div className="page-container"><div className="mx-auto max-w-3xl rounded-[28px] bg-white p-7 shadow-[0_18px_60px_rgba(47,78,59,0.09)] sm:p-10">
    <span className="eyebrow">Inscripción a voluntariado</span>
    <h1 className="section-title mt-4">{reviewing ? "Revisa tu inscripción" : "Reserva tu cupo"}</h1>
    <p className="mt-3 text-sm leading-6 text-[#65756c]">{reviewing ? "Confirma que los datos sean correctos antes de enviar." : "Completa tu motivación para reservar tu lugar en la actividad."}</p>
    {!reviewing ? (
      <form onSubmit={reviewSubmission} className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field label="Participante"><input className="form-input" value={form.nombre} readOnly /></Field>
        <Field label="Correo"><input className="form-input" value={form.email} readOnly /></Field>
        <Field label="Actividad" error={fieldErrors.actividad} errorId="activity-error"><select className="form-input" aria-invalid={Boolean(fieldErrors.actividad)} aria-describedby={fieldErrors.actividad ? "activity-error" : undefined} value={selected?.id ?? ""} onChange={(e) => choose(e.target.value)}><option value="">Selecciona una actividad</option>{activities.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option>)}</select></Field>
        <Field label="Lugar"><input className="form-input" value={selected?.lugar ?? ""} readOnly /></Field>
        <div className="sm:col-span-2">
          <Field label="Motivación" error={fieldErrors.descripcion} errorId="motivation-error"><textarea className="form-input resize-none" maxLength={300} aria-invalid={Boolean(fieldErrors.descripcion)} aria-describedby={fieldErrors.descripcion ? "motivation-error" : undefined} value={form.descripcion} onChange={(e) => { setForm({ ...form, descripcion: e.target.value }); setFieldErrors((current) => ({ ...current, descripcion: undefined })) }} placeholder="Cuéntanos por qué te interesa participar (mínimo 20 caracteres)." /></Field>
          <p className={`mt-1.5 text-right text-xs ${form.descripcion.length >= 300 ? "font-semibold text-[#855a1e]" : "text-[#829087]"}`}>{form.descripcion.length}/300 caracteres · mínimo 20</p>
        </div>
        {error && <p role="alert" className="sm:col-span-2 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#9a3d34]">{error}</p>}
        <button className="button-primary justify-center sm:col-span-2" type="submit">Revisar inscripción <Icon name="arrow" className="h-4 w-4" /></button>
      </form>
    ) : (
      <div className="mt-8">
        <dl className="grid gap-4 rounded-2xl border border-[#e1e8e0] bg-[#f7f9f5] p-5 sm:grid-cols-2">
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#829087]">Participante</dt><dd className="mt-1 text-sm font-semibold text-[#263c31]">{form.nombre}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#829087]">Correo</dt><dd className="mt-1 break-all text-sm font-semibold text-[#263c31]">{form.email}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#829087]">Actividad</dt><dd className="mt-1 text-sm font-semibold text-[#263c31]">{form.actividad}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-wide text-[#829087]">Fecha y lugar</dt><dd className="mt-1 text-sm font-semibold text-[#263c31]">{form.fecha} · {selected?.lugar}</dd></div>
          <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wide text-[#829087]">Motivación</dt><dd className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#52645b]">{form.descripcion}</dd></div>
        </dl>
        {error && <p role="alert" className="mt-4 rounded-xl bg-[#fff0ee] p-3 text-sm text-[#9a3d34]">{error}</p>}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => { setReviewing(false); setError("") }} className="button-secondary justify-center" disabled={isSubmitting}>Volver a editar</button>
          <button type="button" onClick={confirmSubmission} className="button-primary justify-center" disabled={isSubmitting}>{isSubmitting ? "Verificando y enviando..." : "Confirmar inscripción"}{!isSubmitting && <Icon name="check" className="h-4 w-4" />}</button>
        </div>
      </div>
    )}
  </div></div></section>
}

function ListPage() {
  const [records, setRecords] = useState<VolunteerRecord[]>([]); const [query, setQuery] = useState(""); useEffect(() => { getRecords().then(setRecords) }, []); const filtered = useMemo(() => records.filter((item) => `${item.nombre} ${item.actividad}`.toLowerCase().includes(query.toLowerCase())), [records, query])
  return <section className="min-h-[70vh] bg-[#f7f9f5] py-14"><div className="page-container"><span className="eyebrow">Nuestra comunidad</span><h1 className="section-title mt-5">Personas que están sumando</h1><input className="form-input mt-8" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o actividad..." /><div className="mt-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">{filtered.map((record) => <RecordCard key={record.id} record={record} />)}</div></div></section>
}

function NotFound() { return <div className="page-container grid min-h-[65vh] place-items-center text-center"><div><h1 className="section-title">Página no encontrada</h1><Link to="/" className="button-primary mt-7">Volver al inicio</Link></div></div> }

export const router = createBrowserRouter([{ path: "/", Component: Layout, children: [{ index: true, Component: Home }, { path: "actividades", Component: ActivitiesPage }, { path: "acceso", Component: AccessPage }, { path: "registro", Component: Register }, { path: "lista", Component: ListPage }, { path: "*", Component: NotFound }] }])
