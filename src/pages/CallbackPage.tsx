import { useEffect } from 'react'
import { setAuth } from '../store/auth.store'

const CallbackPage = () => {
  useEffect(() => {
    const url = new URL(window.location.href)
    const hash = url.hash
    const hashArr = hash.split('&')

    // Mirroring `po-react/src/pages/Callback/index.tsx`
    const token = hashArr[1]?.replace('access_token=', '') ?? ''
    const idToken = hashArr[0]?.replace('#id_token=', '') ?? ''

    if (token) {
      window.localStorage.setItem('token', token)
      setAuth({ user: null, token })
    }

    if (idToken) {
      window.localStorage.setItem('id_token', idToken)
    }

    window.location.href = '/dashboard'
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-slate-700">Đang xử lý đăng nhập...</div>
    </div>
  )
}

export default CallbackPage


