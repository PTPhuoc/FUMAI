// src/renderer/src/routes/__root.tsx
import LeftBar from '@renderer/components/LeftBar'
import { useUI } from '@renderer/stores/useUI'
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootLayout
})

// src/renderer/src/routes/__root.tsx
// eslint-disable-next-line react-refresh/only-export-components
function RootLayout(): React.JSX.Element {
  const cancelBackground = useUI((s) => s.cancelBackground)
  const setCancelBackground = useUI((s) => s.setCancelBackground)
  return (
    <div className="relative flex w-full h-screen min-w-0">
      {cancelBackground.isOpen && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            setCancelBackground({ isOpen: false, target: '' })
          }}
          className="z-5 absolute top-0 left-0 w-full h-full"
        />
      )}
      <LeftBar />
      <Outlet />
    </div>
  )
}
