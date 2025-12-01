import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <Layout className="min-h-full">
      <Outlet />
    </Layout>
  )
}

export default App
