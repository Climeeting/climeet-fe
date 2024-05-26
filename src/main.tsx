import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'
import '@stackflow/plugin-basic-ui/index.css'
import { RouterProvider } from 'react-router-dom'
import router from './pages/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './utils/tanstack'
import { Stack } from './utils/stackflow'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Stack />
      {/* <RouterProvider router={router} /> */}
    </QueryClientProvider>
  </React.StrictMode>
)
