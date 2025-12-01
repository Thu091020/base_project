import type { PropsWithChildren } from 'react'
import { Layout } from 'antd'

const { Content } = Layout

const LoginLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="min-h-full bg-slate-50">
      <Content className="flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow">{children}</div>
      </Content>
    </Layout>
  )
}

export default LoginLayout


