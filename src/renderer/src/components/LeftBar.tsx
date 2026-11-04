import { Link } from '@tanstack/react-router'
import { House, MessageSquareText, Settings } from 'lucide-react'

export default function LeftBar(): React.JSX.Element {
  return (
    <div className="flex flex-col justify-between gap-2 p-1 min-w-50 h-full bg-zinc-800">
      <div className="flex flex-col gap-2">
        <Link
          to="/"
          className="flex h-10 gap-2 items-center px-2 py-1 border-2 border-zinc-700 rounded-md duration-100 ease-in hover:border-white hover:font-bold active:bg-zinc-600"
        >
          <House className="w-5 h-5" />
          <p>HOME</p>
        </Link>
        <Link
          to="/Chat"
          className="flex h-10 gap-2 items-center px-2 py-1 border-2 border-zinc-700 rounded-md duration-100 ease-in hover:border-white hover:font-bold active:bg-zinc-600"
        >
          <MessageSquareText className="w-5 h-5" />
          <p>CHAT</p>
        </Link>
      </div>
      <Link
        to="/Settings"
        className="flex h-10 gap-2 items-center px-2 py-1 border-2 border-zinc-700 rounded-md duration-100 ease-in hover:border-white hover:font-bold active:bg-zinc-600"
      >
        <Settings className="w-5 h-5" />
        <p>SETTINGS</p>
      </Link>
    </div>
  )
}
