import { useState, type ReactNode } from "react"
import { Link, NavLink, Outlet } from "react-router"
import type { VolunteerRecord } from "./types"

type IconName = "arrow" | "calendar" | "check" | "chevron" | "clock" | "heart" | "leaf" | "mail" | "menu" | "people" | "pin" | "plus" | "search" | "spark"

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  calendar: (
    <>
      <path d="M6 3v3m12-3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
  ),
  leaf: (
    <path d="M20 4c-8 0-14 4-14 10 0 3 2 5 5 5 6 0 9-7 9-15ZM4 21c2-6 6-10 12-13" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5.5a3 3 0 0 1 0 5.8M17 14a5 5 0 0 1 4 4.9V20" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  spark: (
    <path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Zm7 12 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
  ),
}

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2.5"
      aria-label="Sumamos inicio"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1d6642] text-white">
        <Icon name="heart" className="h-[18px] w-[18px]" />
      </span>
      <span className="font-display text-[25px] font-semibold tracking-[-0.03em] text-[#183c2b]">
        Sumamos
      </span>
    </Link>
  )
}

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fbfcf8] text-[#1a2d25]">
      <header className="sticky top-0 z-40 border-b border-[#dfe7df] bg-[#fbfcf8]/95 backdrop-blur">
        <div className="page-container flex h-[72px] items-center justify-between">
          <Logo />
          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Navegación principal"
          >
            {[
              ["/", "Inicio"],
              ["/registro", "Quiero participar"],
              ["/lista", "Inscripciones"],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors hover:text-[#1d6642] ${
                    isActive ? "text-[#1d6642]" : "text-[#52645b]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <Link to="/registro" className="button-primary hidden sm:inline-flex">
            <Icon name="plus" className="h-4 w-4" />
            Inscribirme
          </Link>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[#dbe5dc] md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name="menu" />
          </button>
        </div>
        {menuOpen && (
          <nav
            className="page-container flex flex-col gap-1 border-t border-[#e4eae4] py-3 md:hidden"
            aria-label="Navegación móvil"
          >
            {[
              ["/", "Inicio"],
              ["/registro", "Quiero participar"],
              ["/lista", "Inscripciones"],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive ? "bg-[#e9f2e6] text-[#1d6642]" : "text-[#52645b]"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-[#dfe7df] bg-white">
        <div className="page-container flex flex-col gap-7 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-[#65746c]">
              Pequeñas acciones. Grandes cambios.
            </p>
          </div>
          <div className="flex gap-6 text-sm font-medium text-[#52645b]">
            <Link to="/registro">Participar</Link>
            <Link to="/lista">Inscripciones</Link>
            <a href="mailto:hola@sumamos.org">Contacto</a>
          </div>
          <p className="text-xs text-[#829087]">© 2026 Sumamos</p>
        </div>
      </footer>
    </div>
  )
}

const categoryStyles: Record<string, string> = {
  "Medio ambiente": "bg-[#e4f2e3] text-[#27603e]",
  "Ayuda social": "bg-[#fff0d7] text-[#855a1e]",
  Educación: "bg-[#e8edff] text-[#42538a]",
  Animales: "bg-[#f8e8e2] text-[#8b4e39]",
  Salud: "bg-[#e4f2ef] text-[#28665e]",
  Cultura: "bg-[#f3e8f4] text-[#764877]",
}

export function RecordCard({ record }: { record: VolunteerRecord }) {
  const date = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${record.fecha}T12:00:00`))

  return (
    <article className="group rounded-[20px] border border-[#e1e8e0] bg-white p-5 shadow-[0_3px_16px_rgba(41,72,55,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(41,72,55,0.09)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-bold ${categoryStyles[record.categoria] ?? "bg-[#edf1ec] text-[#536259]"}`}
        >
          {record.categoria}
        </span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#2a7650]">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[#dff3e5]">
            <Icon name="check" className="h-3 w-3" />
          </span>
          {record.estado}
        </span>
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-[#163828]">
        {record.actividad}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#637068]">
        {record.descripcion}
      </p>
      <div className="my-5 h-px bg-[#e8ede7]" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e7f0e8] text-sm font-bold text-[#255c3d]">
            {record.nombre
              .split(" ")
              .map((part) => part[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <p className="text-sm font-semibold text-[#273c32]">
              {record.nombre}
            </p>
            <p className="text-xs text-[#849087]">{record.email}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-[#849087]">Fecha</p>
          <p className="mt-0.5 text-sm font-semibold capitalize text-[#3d5147]">
            {date}
          </p>
        </div>
      </div>
    </article>
  )
}
