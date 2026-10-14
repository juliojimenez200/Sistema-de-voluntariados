import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { createApp } from "./app.js"
import { createStorage } from "./storage.js"

const currentDirectory = dirname(fileURLToPath(import.meta.url))
const dataFile =
  process.env.DATA_FILE ??
  join(currentDirectory, "..", "data", "registros.json")
const port = Number(process.env.PORT ?? 3001)
const allowedOrigin = process.env.CLIENT_ORIGIN ?? "*"

const storage = createStorage(dataFile)
const app = createApp({ storage, allowedOrigin })

app.listen(port, () => {
  console.log(`API Sumamos disponible en http://localhost:${port}/api`)
})
