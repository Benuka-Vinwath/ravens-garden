import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto'
import { dirname, resolve } from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'

type StoredUser = {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  passwordHash: string
  passwordSalt: string
  createdAt: string
}

const usersFile = resolve(process.cwd(), 'data/users.json')

const sendJson = (response: ServerResponse, status: number, body: unknown) => {
  response.writeHead(status, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(body))
}

const readBody = async (request: IncomingMessage) => {
  let body = ''
  for await (const chunk of request) body += chunk
  return JSON.parse(body) as Record<string, string>
}

const readUsers = async (): Promise<StoredUser[]> => {
  try {
    return JSON.parse(await readFile(usersFile, 'utf8')) as StoredUser[]
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw error
  }
}

const saveUsers = async (users: StoredUser[]) => {
  await mkdir(dirname(usersFile), { recursive: true })
  await writeFile(usersFile, `${JSON.stringify(users, null, 2)}\n`, 'utf8')
}

const localAccountsApi = () => ({
  name: 'local-accounts-api',
  configureServer(server: { middlewares: { use: (handler: (request: IncomingMessage, response: ServerResponse, next: () => void) => void | Promise<void>) => void } }) {
    server.middlewares.use(async (request, response, next) => {
      if (!request.url?.startsWith('/api/')) return next()

      try {
        if (request.method === 'POST' && request.url === '/api/users') {
          const { firstName, lastName, username, email, password } = await readBody(request)
          const users = await readUsers()
          const normalizedUsername = username.trim().toLowerCase()
          const normalizedEmail = email.trim().toLowerCase()

          if (users.some((user) => user.username.toLowerCase() === normalizedUsername || user.email.toLowerCase() === normalizedEmail)) {
            return sendJson(response, 409, { message: 'That username or email is already registered.' })
          }

          const passwordSalt = randomBytes(16).toString('hex')
          const user: StoredUser = {
            id: randomUUID(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            username: username.trim(),
            email: email.trim(),
            passwordHash: scryptSync(password, passwordSalt, 64).toString('hex'),
            passwordSalt,
            createdAt: new Date().toISOString(),
          }
          await saveUsers([...users, user])
          return sendJson(response, 201, { id: user.id })
        }

        if (request.method === 'POST' && request.url === '/api/auth/login') {
          const { username, password } = await readBody(request)
          const user = (await readUsers()).find((account) => account.username.toLowerCase() === username.trim().toLowerCase())
          const suppliedHash = user ? scryptSync(password, user.passwordSalt, 64) : null
          const savedHash = user ? Buffer.from(user.passwordHash, 'hex') : null

          if (!user || !suppliedHash || !savedHash || !timingSafeEqual(suppliedHash, savedHash)) {
            return sendJson(response, 401, { message: 'Invalid username or password.' })
          }

          return sendJson(response, 200, {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: randomUUID(),
          })
        }

        return sendJson(response, 404, { message: 'API route not found.' })
      } catch (error) {
        console.error('Local accounts API error:', error)
        return sendJson(response, 400, { message: 'Invalid request.' })
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [localAccountsApi(), vue(), tailwindcss()],
})
