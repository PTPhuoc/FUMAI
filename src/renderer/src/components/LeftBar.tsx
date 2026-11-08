import { Link } from '@tanstack/react-router'
import {
  House,
  ListClock,
  MessageSquareText,
  PanelLeftClose,
  PanelRightClose,
  Settings
} from 'lucide-react'
import { useUI } from '../stores/useUI'
import { useConversation } from '@renderer/stores/useConversation'
import { useEffect } from 'react'
import ConverationItem from './ConverationItem'

// src/renderer/src/components/LeftBar.tsx
export default function LeftBar(): React.JSX.Element {
  const isMainBar = useUI((s) => s.isMainBar)
  const toggleMainBar = useUI((s) => s.toggleMainBar)
  const { isLoading, setLoad, conversations, setConversations } = useConversation((s) => s)

  const handleGetConveration = async (): Promise<void> => {
    try {
      setLoad(true)
      const conversations = await window.api.dbGetConversations()
      setConversations(conversations)
    } catch (error) {
      console.error(error)
    } finally {
      setLoad(false)
    }
  }

  useEffect(() => {
    handleGetConveration()
  }, [])

  return (
    <div
      className={`flex flex-col justify-between gap-2 p-1 ${isMainBar ? 'min-w-0 duration-200' : 'min-w-50 max-w-50 duration-100'}  h-full bg-zinc-800 ease-in-out`}
    >
      <div className="flex flex-col gap-2">
        <button
          className="self-start h-10 rounded-md duration-100 ease-in active:bg-zinc-600"
          onClick={toggleMainBar}
        >
          {isMainBar ? (
            <PanelRightClose className="w-10 h-10" />
          ) : (
            <PanelLeftClose className="w-10 h-10" />
          )}
        </button>
        <Link
          to="/"
          className={`flex h-10 ${isMainBar ? 'gap-0 self-start duration-200' : 'gap-2 self-auto duration-100'} items-center px-2 py-1 border-2 border-zinc-700 rounded-md ease-in-out hover:border-white hover:font-bold active:bg-zinc-600`}
        >
          <House className="w-5 h-5 min-w-0" />
          <p
            className={`${isMainBar ? 'max-w-0 opacity-0' : 'max-w-full opacity-100 duration-200'} overflow-hidden ease-in-out`}
          >
            HOME
          </p>
        </Link>
        <Link
          to="/Chat"
          className={`flex h-10 ${isMainBar ? 'gap-0 self-start duration-200' : 'gap-2 self-auto duration-100'} items-center px-2 py-1 border-2 border-zinc-700 rounded-md ease-in-out hover:border-white hover:font-bold active:bg-zinc-600`}
        >
          <MessageSquareText className="w-5 h-5" />
          <p
            className={`${isMainBar ? 'max-w-0 opacity-0' : 'max-w-full opacity-100 duration-200'} overflow-hidden ease-in-out`}
          >
            CHAT
          </p>
        </Link>
        <div className="flex flex-col gap-2">
          {isMainBar ? (
            <div className="flex items-center h-10 px-2 py-1 border-y-2 border-zinc-700">
              <ListClock className="w-5 h-5 " />
            </div>
          ) : (
            <div className="flex items-center gap-2 px-2 py-1">
              <p className="shrink-0">CHAT HISTORY</p>
              <div className="w-full h-px bg-white" />
            </div>
          )}

          {isLoading ? (
            <>
              <div className="h-10 bg-zinc-500 rounded-md animate-pulse" />
              <div className="h-10 bg-zinc-500 rounded-md animate-pulse" />
              <div className="h-10 bg-zinc-500 rounded-md animate-pulse" />
            </>
          ) : (
            !isMainBar && conversations.map((c) => <ConverationItem key={c.id} conversation={c} />)
          )}
        </div>
      </div>
      <Link
        to="/Settings"
        className={`flex h-10 ${isMainBar ? 'gap-0 self-start duration-200' : 'gap-2 self-auto duration-100'} items-center px-2 py-1 border-2 border-zinc-700 rounded-md ease-in-out hover:border-white hover:font-bold active:bg-zinc-600`}
      >
        <Settings className="w-5 h-5" />
        <p
          className={`${isMainBar ? 'max-w-0 opacity-0' : 'max-w-full opacity-100 duration-200'} overflow-hidden ease-in-out`}
        >
          SETTINGS
        </p>
      </Link>
    </div>
  )
}
