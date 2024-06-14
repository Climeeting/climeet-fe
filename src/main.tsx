import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import '@/utils/dayjs'
import '@stackflow/plugin-basic-ui/index.css'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/tanstack'
import { Stack } from './pages/stackflow'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Stack />
      {/* <RouterProvider router={router} /> */}
    </QueryClientProvider>
  </React.StrictMode>
)
