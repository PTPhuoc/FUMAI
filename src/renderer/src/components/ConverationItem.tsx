import React from 'react'
import { cn } from '@renderer/libs/utils'
import { DbConversation } from '../../../types/globals'
import { Ellipsis } from 'lucide-react'
import { useUI } from '@renderer/stores/useUI'

type PageProps = {
  className?: string
  conversation: DbConversation
  onClick?: () => void
}

// src/renderer/src/components/ConverationItem.tsx
export default function ConverationItem({
  className,
  conversation,
  onClick
}: PageProps): React.JSX.Element {
  const cancelBackground = useUI((s) => s.cancelBackground)
  const setCancelBackground = useUI((s) => s.setCancelBackground)

  return (
    <div className="relative min-w-0">
      <div
        className={cn(
          'flex w-full gap-2 items-center px-2 py-1 border-2 border-zinc-700 rounded-md duration-100 ease-in-out hover:border-white hover:font-bold active:bg-zinc-600',
          className
        )}
        onClick={(e) => {
          e.stopPropagation()
          onClick && onClick()
        }}
      >
        <div className="flex-1 truncate">{conversation.title}</div>
        <button
          className="z-2 shrink-0 cursor-pointer p-1 rounded-full duration-100 ease-in-out active:bg-white active:text-zinc-800"
          onClick={(e) => {
            e.stopPropagation()
            setCancelBackground({ isOpen: true, target: `bar:${conversation.id}` })
          }}
        >
          <Ellipsis className="h-4 w-4" />
        </button>
      </div>
      {cancelBackground.target === `bar:${conversation.id}` && (
        <div className="absolute z-6 top-0 right-0 w-1/2 h-full flex items-center translate-x-[110%]">
          <div className="flex flex-col gap-1 p-1 items-stretch w-full bg-zinc-800 rounded-md overflow-hidden">
            <button className="rounded-md cursor-pointer duration-100 ease-in hover:bg-zinc-600 hover:font-bold active:bg-white active:text-zinc-800">
              Delete
            </button>
            <button className="rounded-md cursor-pointer duration-100 ease-in hover:bg-zinc-600 hover:font-bold active:bg-white active:text-zinc-800">
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
