import { cn } from '@renderer/libs/utils'
import React from 'react'

type PageProps = {
  className?: string
  label?: string
  onClick?: () => void
}

export default function BDefault({ className, label, onClick }: PageProps): React.JSX.Element {
  return (
    <div>
      <button
        className={cn(
          'py-1 px-5 bg-white border-2 border-white text-[#00B7FA] font-bold rounded-md duration-100 ease-in hover:bg-zinc-200 active:bg-zinc-800 active:text-white',
          className
        )}
        onClick={(e) => {
          e.stopPropagation()
          onClick && onClick()
        }}
      >
        {label}
      </button>
    </div>
  )
}
