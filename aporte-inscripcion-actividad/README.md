# Aporte: inscripción a actividades

Esta carpeta contiene el módulo de catálogo y registro a una actividad, junto
con el cliente HTTP y el backend mínimo que valida y persiste inscripciones.
Está preparado para integrarse al proyecto del grupo; no duplica la
autenticación, la navegación general ni las demás pantallas.

## Contenido

- `frontend/src/ActivityRegistration.tsx`: catálogo y formulario de inscripción.
- `frontend/src/activityApi.ts`: envío de la inscripción a la API.
- `frontend/src/types.ts`: tipos usados por el módulo.
- `backend/src/`: rutas, validación, almacenamiento JSON y servidor Express.
- `backend/test/api.test.js`: pruebas de la API.

## Integración con el frontend del grupo

1. Copia los archivos de `frontend/src/` a una carpeta del frontend, por
   ejemplo `src/app/inscripcion/`.
2. El proyecto debe tener React, Tailwind CSS y estas clases globales que ya
   usa la aplicación: `page-container`, `button-primary`, `section-title` y
   `form-input`.
3. Usa `ActivityCatalog` en la ruta del catálogo y navega al formulario cuando
   el usuario elija reservar.
4. Monta `ActivityRegistration` en la ruta del formulario. Pásale la sesión
   existente del usuario, el identificador opcional de actividad elegido y las
   funciones de navegación del proyecto.

Ejemplo de conexión con React Router:

```tsx
<ActivityCatalog
  onRegister={(activityId) =>
    navigate(`/registro?actividad=${encodeURIComponent(activityId)}`)
  }
/>
```

```tsx
<ActivityRegistration
  session={getSession()}
  initialActivityId={searchParams.get("actividad") ?? undefined}
  onLoginRequired={() => navigate("/acceso")}
  onRegistered={() => navigate("/lista")}
/>
```

`getSession`, las rutas `/acceso` y `/lista`, y `navigate` pertenecen a la
aplicación anfitriona; el módulo no los redefine. `onRegistered` se ejecuta
solo cuando el backend confirma el registro.

Configura `VITE_API_URL` con la dirección base de la API, por ejemplo:

```env
VITE_API_URL=http://localhost:3001/api
```

## Ejecutar y probar el backend incluido

Requiere Node.js 22 o superior. Desde esta carpeta:

```bash
cd backend
npm install
npm test
npm start
```

La API queda disponible en `http://localhost:3001/api`. Para crear una
inscripción usa `POST /registros`; para consultar las existentes usa
`GET /registros`. El almacenamiento predeterminado está en
`backend/data/registros.json`. Se pueden configurar `PORT`, `CLIENT_ORIGIN` y
`DATA_FILE` mediante variables de entorno.

El servidor valida nombre, correo, actividad, descripción, fecha y categoría.
Un registro correcto responde `201`; los datos inválidos responden `400`.
