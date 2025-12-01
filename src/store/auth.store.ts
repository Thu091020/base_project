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

export const authSignal = signal<AuthState>({
  user: null,
  token: null,
})

export const setAuth = (state: AuthState) => {
  authSignal.value = state
}

export const clearAuth = () => {
  authSignal.value = { user: null, token: null }
}

export const isAuthenticated = () => !!authSignal.value.token

export const hasRole = (roles: Role[] = []) => {
  if (!roles.length) return true
  const userRoles = authSignal.value.user?.roles ?? []
  return roles.some((r) => userRoles.includes(r))
}


