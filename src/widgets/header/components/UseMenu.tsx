import { Avatar, Dropdown, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { DownOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useMemo } from 'react'
import { authSignal, clearAuth } from '../../../store/auth.store'
import { buildLogoutUrl } from '../../../config/auth.config'

const { Text } = Typography

export const UserMenu = () => {
  const { user } = authSignal.value

  const items: MenuProps['items'] = useMemo(
    () => [
      {
        key: 'profile',
        label: (
          <div className="flex flex-col">
            <Text strong>{user?.name ?? 'User'}</Text>
            <Text type="secondary" className="text-xs">
              {user?.email ?? ''}
            </Text>
          </div>
        ),
        disabled: true,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        label: 'Đăng xuất',
        icon: <LogoutOutlined />,
      },
    ],
    [user],
  )

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      const idToken = window.localStorage.getItem('id_token')
      clearAuth()
      const url = buildLogoutUrl(idToken)
      window.location.href = url.toString()
    }
  }

  return (
    <Dropdown menu={{ items, onClick: handleClick }} trigger={['click']}>
      <Space className="cursor-pointer select-none">
        <Avatar size="small" icon={<UserOutlined />} />
        <Text className="text-gray-900">{user?.name ?? 'User'}</Text>
        <DownOutlined />
      </Space>
    </Dropdown>
  )
}

export default UserMenu


