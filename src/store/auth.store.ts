import { signal } from '@preact/signals-react'

export type Role = 'ADMIN' | 'USER' | 'GUEST'

export interface AuthUser {
  id: string
  name: string
  email: string
  roles: Role[]
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
}

const getInitialToken = (): string | null => {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('token')
}

export const authSignal = signal<AuthState>({
  user: null,
  token: getInitialToken(),
})

export const setAuth = (state: AuthState) => {
  authSignal.value = state

  if (typeof window !== 'undefined') {
    if (state.token) {
      window.localStorage.setItem('token', state.token)
    } else {
      window.localStorage.removeItem('token')
    }
  }
}

export const clearAuth = () => {
  authSignal.value = { user: null, token: null }

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('id_token')
  }
}

export const isAuthenticated = () => !!authSignal.value.token

export const hasRole = (roles: Role[] = []) => {
  if (!roles.length) return true
  const userRoles = authSignal.value.user?.roles ?? []
  return roles.some((r) => userRoles.includes(r))
}

