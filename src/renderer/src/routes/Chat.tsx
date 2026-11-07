import React, { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  CreateConversationInput,
  CreateMessageInput,
  DbConversation,
  Messages
} from '../../../types/globals'
import IChatDefault from '@renderer/components/inputs/IChatDefault'
import BDefault from '@renderer/components/buttons/BDefault'
import Markdown from '@renderer/components/Markdown'
import { useSetting } from '@renderer/stores/useSetting'
import { useChat } from '@renderer/stores/useChat'
import { useConversation } from '@renderer/stores/useConversation'

// src/renderer/src/routes/chat.tsx
export const Route = createFileRoute('/Chat')({
  component: Chat
})

// eslint-disable-next-line react-refresh/only-export-components
function Chat(): React.JSX.Element {
  const [history, setHistory] = useState<Messages[]>([])
  const [chatValue, setChatValue] = useState<Messages>({
    role: 'user',
    content: ''
  })
  const [isAtBottom, setIsAtBottom] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const model = useSetting((s) => s.model)
  const conversationId = useChat((s) => s.conversationId)
  const conversations = useConversation((s) => s.conversations)
  const setConversationId = useChat((s) => s.setConversationId)
  const setConversations = useConversation((s) => s.setConversations)

  useEffect(() => {
    const containerEl = containerRef.current
    const bottomEl = bottomRef.current

    if (!containerEl || !bottomEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtBottom(entry.isIntersecting)
      },
      {
        root: containerEl,
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
      }
    )

    observer.observe(bottomEl)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAtBottom) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, isAtBottom])

  const handleChat = async (messages: Messages[], conversationId: string): Promise<void> => {
    try {
      const reply = await window.api.chatDefault(messages)
      setHistory((prev) => [...prev, reply])
      await handleSaveMessage({
        conversationId: conversationId,
        role: reply.role,
        content: reply.content
      })
    } catch (error) {
      console.log(error)
    }
  }
  const handleSaveConversation = async (
    conversation: CreateConversationInput
  ): Promise<string | null> => {
    try {
      const newConversation = await window.api.dbCreateConversation(conversation)
      setConversations(
        [...conversations, newConversation].sort((a, b) => b.updatedAt - a.updatedAt)
      )
      return newConversation.id
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const handleSaveMessage = async (message: CreateMessageInput): Promise<void> => {
    try {
      await window.api.dbCreateMessage(message)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClientSave = (history: Messages[]): void => {
    setHistory(history)
    setChatValue({ role: 'user', content: '' })
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const handleSend = async (): Promise<void> => {
    if (!chatValue.content.trim()) return
    const newHistory = [...history, { ...chatValue, content: chatValue.content.trim() }]
    handleClientSave(newHistory)
    handleDBSave(newHistory, chatValue.content.trim())
  }

  const handleDBSave = async (history: Messages[], content: string): Promise<void> => {
    let convId = conversationId
    if (!convId) {
      convId = await handleSaveConversation({ model: model, title: content })
      if (!convId) return
      setConversationId(convId)
    }
    await handleChat(history, convId)
  }

  const modelChangeTitle = async (conversation: DbConversation): Promise<void> => {
    try {
      const userMessage = history.find((m) => m.role === 'user')
      if (!userMessage) return
      const reply = await window.api.cvtGenerateTitle(userMessage.content)
      const newCvt = { ...conversation, title: reply.content, titleSource: 'generated' as const }
      const cvtChanged = [...conversations.filter((c) => c.id !== conversation.id), newCvt]
      setConversations(cvtChanged)
      await window.api.dbModelChangeTitle(conversation.id, reply.content)
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  useEffect(() => {
    if (conversations.length > 0 && conversationId) {
      const thisConversation = conversations.find((c) => c.id === conversationId)
      if (thisConversation && thisConversation.titleSource === 'auto') {
        const modelMessage = history.find((m) => m.role === 'assistant')
        if (!modelMessage) return
        modelChangeTitle(thisConversation)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, history])

  useEffect(() => {
    console.log('History: ', history)
  }, [history])

  useEffect(() => {
    console.log('Conversations: ', conversations)
  }, [conversations])

  return (
    <div className="flex flex-col w-full h-full gap-2 items-center min-w-0">
      <div
        className="flex-1 flex items-center justify-center w-full min-w-0 overflow-auto"
        ref={containerRef}
      >
        <div className="flex flex-col p-1 lg:w-3/4 w-full h-full min-w-0 gap-2">
          {history.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 w-full ${item.role === 'user' && 'items-end'}`}
            >
              {item.role === 'user' ? (
                <p className="max-w-3/4 p-2 bg-zinc-800 rounded-md">{item.content}</p>
              ) : (
                <Markdown
                  className="max-w-3/4 p-2 bg-zinc-800 text-white rounded-md prose-pre:p-1 prose-pre:my-1 prose-pre:rounded-md"
                  content={item.content}
                />
              )}
            </div>
          ))}
          <div ref={bottomRef} className="h-px" />
        </div>
      </div>
      <div className="flex p-1 gap-2 items-center lg:w-3/4 w-full">
        <IChatDefault
          value={chatValue.content}
          outValue={(value) => setChatValue({ ...chatValue, content: value })}
          onKeyDown={handleKeyDown}
        />
        <BDefault label="Send" onClick={() => handleSend()} />
      </div>
    </div>
  )
}
