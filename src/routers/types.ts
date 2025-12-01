import type { ReactNode } from 'react'
import type { Role } from '../store/auth.store'

export type LayoutKey = 'main' | 'login' | 'extension'

export interface RouteOptions {
  requireAuth: boolean
  hideInMenu: boolean
  roles?: Role[]
}

export interface RouteConfig {
  path: string
  element: ReactNode
  layout: LayoutKey
  options: RouteOptions
}

