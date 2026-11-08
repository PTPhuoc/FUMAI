import { create } from 'zustand'
import { DbConversation } from '../../../types/globals'

type ConversationStore = {
  isLoading: boolean
  conversations: DbConversation[]
  setConversations: (conversations: DbConversation[]) => void
  setLoad: (isLoading: boolean) => void
}

export const useConversation = create<ConversationStore>((set) => ({
  isLoading: false,
  conversations: [],
  setConversations: (conversations: DbConversation[]) => set({ conversations }),
  setLoad: (isLoading: boolean) => set({ isLoading })
}))
