import type { RouteConfig } from './types'
import App from '../App'
import { DashboardPage } from '../features/dashboard/components/DashboardPage'
import UserList from '../features/user-managements/components/UserList/UserList'

const defaultOptions = {
  requireAuth: false,
  hideInMenu: false,
} as const

const defaultAuthOptions = {
  requireAuth: true,
  hideInMenu: false,
} as const

export const ROUTE = {
  home: {
    path: '/',
    element: <App />,
    layout: 'main',
    options: defaultOptions,
  },
  dashboard: {
    path: '/dashboard',
    element: <DashboardPage />,
    layout: 'main',
    options: {
      ...defaultAuthOptions,
      roles: ['ADMIN', 'USER'],
    },
  },
  userList: {
    path: '/user-list',
    element: <UserList />,
    layout: 'main',
    options: {
      ...defaultAuthOptions,
      roles: ['ADMIN'],
    },
  },
} satisfies Record<string, RouteConfig>

