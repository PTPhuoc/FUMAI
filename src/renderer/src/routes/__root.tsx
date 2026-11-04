// src/renderer/src/routes/__root.tsx
import LeftBar from '@renderer/components/LeftBar'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout
})

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout(): React.JSX.Element {
  return (
    <div className="flex w-full h-screen min-w-0">
      <LeftBar />
      <Outlet />
    </div>
  )
}
