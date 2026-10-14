# Sumamos — Inscripciones a voluntariados

Aplicación web para registrar y consultar inscripciones a actividades de
voluntariado. Implementa el flujo completo:

`React → petición HTTP → API Express → archivo JSON → consulta en React`.

## Funcionalidades

- Inicio y navegación mediante React Router.
- Formulario controlado con participante, correo, actividad, fecha, tipo de
  actividad y descripción.
- Validación en frontend y backend.
- Consulta, búsqueda y filtrado de inscripciones.
- Estados de carga, lista vacía, confirmación y error.
- API REST con códigos HTTP apropiados.
- Identificadores únicos con formato `VOL-XXXXXXXX`.
- Persistencia en `backend/data/registros.json`.
- Escritura atómica para reducir el riesgo de dañar el archivo.
- CORS configurable.

## Requisitos

- Node.js 22 o superior.
- pnpm 10 o superior.

## Estructura

```text
.
├── src/                       # Frontend React
│   └── app/
│       ├── components.tsx
│       ├── data.ts            # Peticiones GET y POST
│       ├── routes.tsx
│       └── types.ts
├── backend/
│   ├── data/registros.json    # Almacenamiento persistente
│   ├── src/
│   │   ├── app.js             # Rutas y manejo de errores
│   │   ├── server.js
│   │   ├── storage.js
│   │   └── validation.js
│   └── test/api.test.js
├── .env.example
└── package.json
```

## Instalación

Desde la raíz del repositorio:

```bash
pnpm install
pnpm --dir backend install
```

Copie la configuración de ejemplo:

```bash
cp .env.example .env
```

## Ejecución

Terminal 1, backend en `http://localhost:3001`:

```bash
pnpm backend
```

Terminal 2, frontend en `http://localhost:5173`:

```bash
pnpm dev
```

El frontend lee `VITE_API_URL=http://localhost:3001/api` desde `.env`. Si la
variable no existe, utiliza almacenamiento local únicamente como modo de
demostración para la vista previa.

Variables opcionales del backend:

| Variable | Valor predeterminado | Uso |
| --- | --- | --- |
| `PORT` | `3001` | Puerto de Express |
| `CLIENT_ORIGIN` | `*` | Origen autorizado por CORS |
| `DATA_FILE` | `backend/data/registros.json` | Archivo de almacenamiento |

## API

### Consultar inscripciones

```http
GET /registros
```

Respuesta `200 OK`:

```json
[]
```

### Crear una inscripción

```http
POST /registros
Content-Type: application/json
```

Ejemplo:

```json
{
  "nombre": "Ana Martínez",
  "email": "ana@example.com",
  "actividad": "Limpieza del parque",
  "descripcion": "Deseo colaborar con el cuidado de los espacios comunes.",
  "fecha": "2027-05-20",
  "categoria": "Medio ambiente"
}
```

La creación correcta responde `201 Created`. Los datos inválidos responden
`400 Bad Request` con una lista de errores. Los errores de almacenamiento
responden `500 Internal Server Error`.

Las rutas también están disponibles con el prefijo `/api` (`/api/registros`),
que es la dirección utilizada por la configuración de ejemplo del frontend.

## Pruebas

```bash
pnpm test:backend
pnpm build
```

Las pruebas comprueban:

1. Inicialización automática con una lista vacía.
2. Rechazo de datos inválidos.
3. Creación mediante POST.
4. Consulta mediante GET.
5. Persistencia en el archivo JSON.

Para verificar manualmente la persistencia, cree una inscripción, detenga el
backend, inícielo nuevamente y consulte `GET /api/registros`. El registro debe
continuar disponible.

## Evidencias para la entrega

El informe debe agregar los nombres y aportes de los cuatro integrantes, la
captura del registro compartido de temas, capturas del proyecto y enlaces al
video y al repositorio. Esos datos no se incluyen aquí porque dependen del
equipo.
