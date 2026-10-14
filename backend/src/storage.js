import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import { dirname } from "node:path"

export function createStorage(filePath) {
  async function ensureFile() {
    await mkdir(dirname(filePath), { recursive: true })

    try {
      await readFile(filePath, "utf8")
    } catch (error) {
      if (error.code !== "ENOENT") throw error
      await writeFile(filePath, "[]\n", "utf8")
    }
  }

  async function readAll() {
    await ensureFile()
    const content = await readFile(filePath, "utf8")

    try {
      const records = JSON.parse(content)
      if (!Array.isArray(records)) {
        throw new Error("El archivo de registros no contiene una lista.")
      }
      return records
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error("El archivo de registros contiene JSON inválido.", {
          cause: error,
        })
      }
      throw error
    }
  }

  async function writeAll(records) {
    await ensureFile()
    const temporaryPath = `${filePath}.tmp`
    await writeFile(
      temporaryPath,
      `${JSON.stringify(records, null, 2)}\n`,
      "utf8",
    )
    await rename(temporaryPath, filePath)
  }

  async function add(record) {
    const records = await readAll()
    records.unshift(record)
    await writeAll(records)
    return record
  }

  return { readAll, add }
}
