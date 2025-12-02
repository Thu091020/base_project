import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Tương tự cấu hình ở po-react/vite.config.ts nhưng dùng plugin react-swc
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())

  const port = Number(env.VITE_PORT) || 5173

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port,
      watch: {
        usePolling: true,
      },
    },
    plugins: [react()],
    preview: {
      port,
    },
    define: {
      'process.env': {},
    },
  })
}

