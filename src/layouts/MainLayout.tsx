import type { PropsWithChildren } from 'react'
import { Layout } from 'antd'
import Header from '../widgets/header/Header'
import { SideBar } from '../widgets/side-bar'
import { useState } from 'react'

const { Content } = Layout

const MainLayout = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="min-h-screen bg-bg-main">
      <Header title="Dashboard" subtitle="Purchase management" />
      <Layout hasSider className="bg-bg-main flex-1">
        <SideBar collapsed={collapsed} onCollapseChange={setCollapsed} />
        <Content className="bg-bg-main">
          <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout

 
