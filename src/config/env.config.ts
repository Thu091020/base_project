export type AppEnv = 'development' | 'production' | 'test'

const getEnv = (key: string, fallback = ''): string => {
  const value = import.meta.env[key as keyof ImportMetaEnv] as string | undefined
  return value ?? fallback
}

export const appConfig = {
  env: (getEnv('VITE_APP_ENV', 'development') as AppEnv) ?? 'development',
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'https://api.example.com'),
}


