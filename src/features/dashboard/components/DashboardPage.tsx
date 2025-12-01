import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export const DashboardPage = () => {
  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8">
        <Title level={3} className="!mb-0">
          Dashboard
        </Title>
        <Paragraph>Welcome to the base dashboard page.</Paragraph>
      </div>
    </div>
  )
}


