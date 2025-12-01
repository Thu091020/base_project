import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { AppRouter } from './routers/AppRouter'
import { queryClient } from './config/query-client.config'
import { antTheme } from './config/theme.config'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={antTheme}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </ConfigProvider>
  </StrictMode>,
)
