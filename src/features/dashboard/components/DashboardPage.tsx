import { Typography } from 'antd'

const { Title, Paragraph } = Typography

 const DashboardPage = () => {
  return (
    <div className="min-h-full bg-bg-sub">
      <div className="mx-auto flex flex-col gap-4 px-4 py-8 rounded-lg bg-bg-card">
        <Title level={3} className="!mb-0 text-text-main">
          Dashboard
        </Title>
        <Paragraph className="text-text-sub">Welcome to the base dashboard page.</Paragraph>
      </div>
    </div>
  )
}

export default DashboardPage
