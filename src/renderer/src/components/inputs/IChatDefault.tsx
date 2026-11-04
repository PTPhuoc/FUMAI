import { cn } from '@renderer/libs/utils'
import React from 'react'

type PageProps = {
  className?: string
  placeholder?: string
  value: string
  outValue: (value: string) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function IChatDefault({
  className,
  placeholder = '',
  value,
  outValue,
  onKeyDown
}: PageProps): React.JSX.Element {
  return (
    <div className={cn('flex gap-2 items-center w-full h-full', className)}>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => outValue(e.target.value)}
        onKeyDown={onKeyDown}
        className="outline-none w-full h-10 p-2 bg-zinc-800 rounded-md"
      />
    </div>
  )
}
