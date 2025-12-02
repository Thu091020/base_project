import type { ReactNode } from 'react'
import { Breadcrumb, Layout, Space, Typography } from 'antd'

import UserMenu from './components/UseMenu'
import { useTheme } from '../../context/ThemeContext'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

const { Header: AntHeader } = Layout
const { Title, Text } = Typography

export interface HeaderProps {
  title: string
  subtitle?: string
  breadcrumbItems?: { title: ReactNode; href?: string }[]
  actions?: ReactNode
}

export const Header = ({ title, subtitle, breadcrumbItems, actions }: HeaderProps) => {
  const { mode, toggleMode } = useTheme()

  const isDark = mode === 'dark'

  return (
    <AntHeader className="flex items-center h-16 justify-between bg-bg-header px-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <Title level={4} className="!mb-0 text-text-main">
              {title}
            </Title>
            {subtitle ? (
              <Text className="mt-0.5 text-text-sub">{subtitle}</Text>
            ) : null}
          </div>
        </div>
        {breadcrumbItems && breadcrumbItems.length > 0 ? (
          <Breadcrumb
            items={breadcrumbItems.map((item) => ({
              title: item.title,
              href: item.href,
            }))}
          />
        ) : null}
      </div>
      <Space align="center" size="large">
        <Space>
         
          {isDark ? (
            <SunOutlined className="text-text-sub" onClick={toggleMode} />
          ) : (
            <MoonOutlined className="text-text-sub" onClick={toggleMode} />
          )}
        </Space>
        {actions}
        <UserMenu />
      </Space>
    </AntHeader>
  )
}

export default Header

