import { appConfig } from './env.config'

/**
 * Build OAuth authorize URL similar to `po-react/src/config/auth.ts`
 * Uses environment variables defined in `env.config.ts`.
 */
export const buildAuthUrl = (): URL => {
  const url = new URL(`${appConfig.loginUrl}/connect/authorize/callback`)

  url.searchParams.set('response_type', 'token id_token')
  url.searchParams.set('client_id', appConfig.loginClientId)
  url.searchParams.set('redirect_uri', appConfig.loginRedirectUri)
  url.searchParams.set('scope', appConfig.loginScope)

  const nonce = crypto.randomUUID().replace(/-/g, '').slice(0, 40)
  url.searchParams.set('nonce', nonce)
  url.searchParams.set('state', nonce)

  return url
}

/**
 * Build logout URL similar to `po-react/src/config/auth.ts`
 */
export const buildLogoutUrl = (idToken: string | null): URL => {
  const url = new URL(`${appConfig.loginUrl}/connect/endsession`)

  if (idToken) {
    url.searchParams.set('id_token_hint', idToken)
  }
  url.searchParams.set('post_logout_redirect_uri', appConfig.logoutRedirectUri)

  return url
}


