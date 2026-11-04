// src/renderer/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createMemoryHistory } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen' // ← file này do plugin TỰ SINH
import './assets/main.css'

// Tạo memory history — hoạt động trong cả dev (http://) và production (file://)
const memoryHistory = createMemoryHistory({ initialEntries: ['/'] })

// Tạo router instance từ routeTree do plugin sinh
const router = createRouter({
  routeTree,
  history: memoryHistory,
  defaultPreload: 'intent' // preload route khi user hover Link
})

// Khai báo type cho toàn app biết router có gì
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
