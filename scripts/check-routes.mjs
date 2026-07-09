import { readFile, readdir } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const root = process.cwd()
const contentDir = join(root, 'content')
const baseURL = process.env.SITE_CHECK_BASE_URL || 'http://127.0.0.1:3000'

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(path))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path)
    }
  }

  return files
}

function routeFromFile(file) {
  const rel = relative(contentDir, file)
  if (rel === 'index.md') {
    return '/'
  }

  const parts = rel.split(sep).map(part => part
    .replace(/^\d+\./, '')
    .replace(/\.md$/, ''))
  const route = `/${parts.join('/')}`.replace(/\/index$/, '')

  return route
}

const files = await listMarkdownFiles(contentDir)
const routes = Array.from(new Set([
  ...files.map(routeFromFile),
  '/raw/codex/model.md',
  '/llms.txt',
  '/llms-full.txt'
])).sort()

const failures = []
let rawCodexModelText = ''

for (const route of routes) {
  const url = `${baseURL}${route}`
  try {
    const response = await fetch(url)
    console.log(`${String(response.status).padStart(3)} ${route}`)
    if (response.status !== 200) {
      failures.push(`${response.status} ${route}`)
    } else if (route === '/raw/codex/model.md') {
      rawCodexModelText = await response.text()
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.log(`ERR ${route} ${message}`)
    failures.push(`ERR ${route} ${message}`)
  }
}

const sourceCodexModelText = await readFile(join(contentDir, '3.codex', '5.model.md'), 'utf8')
if (rawCodexModelText !== sourceCodexModelText) {
  failures.push('/raw/codex/model.md does not match content/3.codex/5.model.md')
}

if (failures.length) {
  console.error('\nRoute check failed:')
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log(`\nRoute check passed: ${routes.length} routes.`)
