import { Outlet } from 'react-router-dom'
import { Layout, Typography, Button } from 'antd'
import { Link } from 'react-router-dom'

const { Header, Footer } = Layout
const { Title } = Typography

const AppShell = () => {
  return (
    <Layout className="min-h-full">
      <Header className="flex items-center justify-between bg-white px-6 shadow-sm">
        <Title level={4} className="!mb-0">
          Demo Features Base
        </Title>
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button type="primary">Dashboard</Button>
          </Link>
          <Link to="/user-list">
            <Button>Users</Button>
          </Link>
        </div>
      </Header>
      <Outlet />
      <Footer className="text-center text-xs text-slate-500">
        Demo Features Base &copy; {new Date().getFullYear()}
      </Footer>
    </Layout>
  )
}

export default AppShell


