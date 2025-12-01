import type { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { hasRole, isAuthenticated, type Role } from '../store/auth.store'

interface GuardProps {
  children: ReactElement
  roles?: Role[]
  isPrivate?: boolean
}

export const ProtectedRoute = ({ children, roles, isPrivate = true }: GuardProps) => {
  if (isPrivate && !isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  if (!hasRole(roles)) {
    return <Navigate to="/forbidden" replace />
  }

  return children
}


