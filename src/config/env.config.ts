export type AppEnv = 'development' | 'production' | 'test'

const getEnv = (key: string, fallback = ''): string => {
  const value = import.meta.env[key as keyof ImportMetaEnv] as string | undefined
  return value ?? fallback
}

export const appConfig = {
  env: (getEnv('VITE_APP_ENV', 'development') as AppEnv) ?? 'development',
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'https://api.example.com'),

  // Auth-related configuration (mirrors `po-react/src/config/env.ts`)
  loginUrl: getEnv('VITE_LOGIN_URL', ''),
  loginScope: getEnv('VITE_LOGIN_SCOPE', ''),
  loginClientId: getEnv('VITE_LOGIN_CLIENT_ID', ''),
  loginRedirectUri: getEnv('VITE_LOGIN_REDIRECT_URI', ''),
  logoutRedirectUri: getEnv('VITE_LOGOUT_REDIRECT_URI', ''),
}

