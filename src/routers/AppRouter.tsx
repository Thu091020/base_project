import React from 'react'
import { createBrowserRouter, Navigate, Outlet, RouterProvider, type RouteObject } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoginLayout from '../layouts/LoginLayout'
import ExtensionLayout from '../layouts/ExtensionLayout'
import AppShell from '../AppShell'
import { ROUTE } from './routes.config'
import { ProtectedRoute } from './guards'
import type { LayoutKey } from './types'

const layoutMap: Record<LayoutKey, React.ComponentType<React.PropsWithChildren>> = {
  main: MainLayout,
  login: LoginLayout,
  extension: ExtensionLayout,
}

const buildRouter = () => {
  const layoutRoutes: Record<string, RouteObject> = {}

  Object.values(ROUTE).forEach((route) => {
    const { layout, path, element, options } = route

    if (!layoutRoutes[layout]) {
      const LayoutComponent = layoutMap[layout]
      layoutRoutes[layout] = {
        element: (
          <LayoutComponent>
            <React.Suspense fallback={null}>
              <Outlet />
            </React.Suspense>
          </LayoutComponent>
        ),
        children: [],
      }
    }

    const roles = (options as typeof options & { roles?: import('../store/auth.store').Role[] }).roles

    const childElement =
      options.requireAuth || roles ? (
        <ProtectedRoute roles={roles} isPrivate={options.requireAuth}>
          {element as React.ReactElement}
        </ProtectedRoute>
      ) : (
        element
      )

    layoutRoutes[layout].children!.push({
      path: path.replace(/^\//, ''),
      element: childElement,
    })

    layoutRoutes[layout].children!.push({
      path: '*',
      element: <Navigate to="/404" replace />,
    })
  })

  const routes: RouteObject = {
    path: '/',
    element: <AppShell />,
    children: Object.values(layoutRoutes),
  }

  return createBrowserRouter([routes])
}

const router = buildRouter()

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

