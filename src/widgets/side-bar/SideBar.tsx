import { Layout, Menu } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout

export interface SideBarItem {
  key: string
  label: string
  path: string
  icon?: React.ReactNode
}

const defaultItems: SideBarItem[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <DashboardOutlined /> },
  { key: 'users', label: 'Users', path: '/users', icon: <UserOutlined /> },
  { key: 'teams', label: 'Teams', path: '/teams', icon: <TeamOutlined /> },
  { key: 'reports', label: 'Reports', path: '/reports', icon: <BarChartOutlined /> },
]

export interface SideBarProps {
  items?: SideBarItem[]
  collapsed?: boolean
  onCollapseChange?: (collapsed: boolean) => void
}

export const SideBar = ({ items = defaultItems, collapsed, onCollapseChange }: SideBarProps) => {
  const location = useLocation()
  const navigate = useNavigate()

  const selectedKeys =
    items.find((item) => location.pathname.startsWith(item.path))?.key ?? 'dashboard'

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapseChange}
      width={220}
      className="h-full bg-bg-navbar border-r border-border p-2"
      style={{
        height: 'calc(100vh - 64px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Menu
        mode="inline"
        style={{
          flex: 1,
          borderInlineEnd: 'none',
          paddingTop: 8,
          paddingBottom: 8,
          rowGap: 4,
        }}
        selectedKeys={[selectedKeys]}
        items={items.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: () => {
            if (location.pathname !== item.path) {
              navigate(item.path)
            }
          },
        }))}
      />
    </Sider>
  )
}

export default SideBar


