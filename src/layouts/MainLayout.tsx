import type { PropsWithChildren } from 'react'
import { Layout } from 'antd'

const { Content } = Layout

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className="min-h-full">
      <Content className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
      </Content>
    </Layout>
  )
}

export default MainLayout


