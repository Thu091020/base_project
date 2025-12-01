import React from 'react'
import { List, Typography } from 'antd'
import { useGetUserList } from '../../hooks/useGetUserList.ts'

const { Text, Title } = Typography

const UserList = () => {
  const { data, isLoading } = useGetUserList()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      <Title level={4} className="!mb-0">
        Users
      </Title>
      <List
        bordered
        dataSource={data?.data ?? []}
        renderItem={(item) => (
          <List.Item>
            <Text>
              #{item.id} - {item.name}
            </Text>
          </List.Item>
        )}
      />
    </div>
  )
}

export default React.memo(UserList)