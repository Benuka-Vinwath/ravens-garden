import { ref, watch } from 'vue'

export interface AuthUser {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  token: string
}

const STORAGE_KEY = 'ravens-garden-auth-user'
const authUser = ref<AuthUser | null>(null)
let initialized = false

const loadAuthUser = (): void => {
  if (initialized) return
  initialized = true

  if (typeof window === 'undefined') return
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  try {
    authUser.value = JSON.parse(raw) as AuthUser
  } catch {
    authUser.value = null
  }
}

if (typeof window !== 'undefined') {
  loadAuthUser()
  watch(authUser, (user) => {
    if (!user) {
      window.localStorage.removeItem(STORAGE_KEY)
      return
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  })
}

export const useAuth = () => {
  loadAuthUser()

  const setAuthUser = (user: AuthUser): void => {
    authUser.value = user
  }

  const logout = (): void => {
    authUser.value = null
  }

  return {
    authUser,
    setAuthUser,
    logout,
  }
}
