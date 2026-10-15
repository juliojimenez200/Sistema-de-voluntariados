import { randomUUID } from "node:crypto"
import cors from "cors"
import express from "express"
import { validateRecord } from "./validation.js"

export function createApp({ storage, allowedOrigin = "*" }) {
  const app = express()
  const router = express.Router()

  app.disable("x-powered-by")
  app.use(
    cors({
      origin: allowedOrigin === "*" ? true : allowedOrigin,
    }),
  )
  app.use(express.json({ limit: "50kb" }))

  router.get("/salud", (_request, response) => {
    response.status(200).json({ estado: "ok" })
  })

  router.get("/registros", async (_request, response, next) => {
    try {
      const records = await storage.readAll()
      response.status(200).json(records)
    } catch (error) {
      next(error)
    }
  })

  router.post("/registros", async (request, response, next) => {
    const { errors, data } = validateRecord(request.body)

    if (errors.length > 0) {
      return response.status(400).json({
        error: "Los datos enviados no son válidos.",
        detalles: errors,
      })
    }

    try {
      const records = await storage.readAll()
      const duplicate = records.some(
        (record) =>
          record.email.trim().toLowerCase() === data.email &&
          record.actividad.trim().toLowerCase() ===
            data.actividad.toLowerCase(),
      )
      if (duplicate) {
        return response.status(409).json({
          error: "Ya tienes una inscripción para esta actividad.",
        })
      }

      const record = {
        id: `VOL-${randomUUID().slice(0, 8).toUpperCase()}`,
        ...data,
        estado: "Confirmada",
        createdAt: new Date().toISOString(),
      }
      await storage.add(record)
      return response.status(201).json(record)
    } catch (error) {
      return next(error)
    }
  })

  app.use("/", router)
  app.use("/api", router)

  app.use((_request, response) => {
    response.status(404).json({ error: "Ruta no encontrada." })
  })

  app.use((error, _request, response, _next) => {
    if (error instanceof SyntaxError && "body" in error) {
      return response
        .status(400)
        .json({ error: "El JSON enviado no es válido." })
    }

    console.error("Error de la API:", error.message)
    return response.status(500).json({
      error: "No fue posible leer o guardar los registros.",
    })
  })

  return app
}
