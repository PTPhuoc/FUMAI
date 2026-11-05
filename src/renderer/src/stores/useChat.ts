import { create } from 'zustand'

type ChatStore = {
  conversationId: string | null
  isStreaming: boolean
  setConversationId: (conversationId: string) => void
  setIsStreaming: (isStreaming: boolean) => void
}

export const useChat = create<ChatStore>((set) => ({
  conversationId: null,
  isStreaming: false,
  setConversationId: (conversationId: string) => set(() => ({ conversationId })),
  setIsStreaming: (isStreaming: boolean) => set(() => ({ isStreaming }))
}))
