import React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Settings')({
  component: Settings
})

// eslint-disable-next-line react-refresh/only-export-components
function Settings(): React.JSX.Element {
  return <div>settings</div>
}
