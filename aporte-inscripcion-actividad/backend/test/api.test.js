import assert from "node:assert/strict"
import { mkdtemp, readFile, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { after, before, test } from "node:test"
import { createApp } from "../src/app.js"
import { createStorage } from "../src/storage.js"

let baseUrl
let dataFile
let server
let temporaryDirectory

before(async () => {
  temporaryDirectory = await mkdtemp(join(tmpdir(), "sumamos-test-"))
  dataFile = join(temporaryDirectory, "registros.json")
  const storage = createStorage(dataFile)
  const app = createApp({ storage })

  await new Promise((resolve) => {
    server = app.listen(0, "127.0.0.1", resolve)
  })
  const address = server.address()
  baseUrl = `http://127.0.0.1:${address.port}/api`
})

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
  await rm(temporaryDirectory, { recursive: true, force: true })
})

function futureDate() {
  const date = new Date()
  date.setDate(date.getDate() + 10)
  return date.toISOString().slice(0, 10)
}

test("GET inicializa el archivo y responde una lista vacía", async () => {
  const response = await fetch(`${baseUrl}/registros`)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), [])
})

test("POST rechaza datos inválidos con código 400", async () => {
  const response = await fetch(`${baseUrl}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre: "A", email: "incorrecto" }),
  })
  const body = await response.json()

  assert.equal(response.status, 400)
  assert.equal(body.error, "Los datos enviados no son válidos.")
  assert.ok(body.detalles.length >= 1)
})

test("POST crea un registro y GET permite consultarlo", async () => {
  const input = {
    nombre: "Ana Martínez",
    email: "ana@example.com",
    actividad: "Limpieza del parque",
    descripcion: "Deseo colaborar con el cuidado de los espacios comunes.",
    fecha: futureDate(),
    categoria: "Medio ambiente",
  }

  const createResponse = await fetch(`${baseUrl}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  })
  const created = await createResponse.json()

  assert.equal(createResponse.status, 201)
  assert.match(created.id, /^VOL-[A-F0-9]{8}$/)
  assert.equal(created.estado, "Confirmada")

  const getResponse = await fetch(`${baseUrl}/registros`)
  const records = await getResponse.json()
  assert.equal(records.length, 1)
  assert.equal(records[0].id, created.id)

  const persisted = JSON.parse(await readFile(dataFile, "utf8"))
  assert.equal(persisted[0].email, input.email)
})
