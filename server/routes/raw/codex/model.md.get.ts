import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default eventHandler(async (event) => {
  const sourcePath = join(process.cwd(), 'content', '3.codex', '5.model.md')

  try {
    const source = await readFile(sourcePath, 'utf8')
    setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
    return source
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }
})
