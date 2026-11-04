import React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: index
})

function index(): React.JSX.Element {
  return <div>index</div>
}
