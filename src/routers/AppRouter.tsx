import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import App from '../App'
import MainLayout from '../layouts/MainLayout'
import { isAuthenticated, setAuth } from '../store/auth.store'
import { buildAuthUrl } from '../config/auth.config'
import CallbackPage from '../pages/CallbackPage'
import DashboardPage from '../features/dashboard/components/DashboardPage'

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation()

  const token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null

  if (!token && !location.pathname.startsWith('/callback')) {
    // No token in storage: redirect to external login (mirrors `MainApp` behavior in po-react)
    const authUrl = buildAuthUrl()
    window.location.href = authUrl.toString()
    return null
  }

  if (token && !isAuthenticated()) {
    // Ensure in-memory auth state is hydrated from localStorage
    setAuth({ user: null, token })
  }

  if (!token) {
    return null
  }

  return <>{children}</>
}

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
  
        <Route path="/callback" element={<CallbackPage />} />

        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <RequireAuth>
                <Navigate to="/dashboard" replace />
              </RequireAuth>
            }
          />

          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <MainLayout>
                  <DashboardPage />
                </MainLayout>
              </RequireAuth>
            }
          />
        </Route>

        <Route
          path="*"
          element={
            <RequireAuth>
              <Navigate to="/dashboard" replace />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter


