import { create } from 'zustand'
import { DbConversation } from '../../../types/globals'

type ConversationStore = {
  conversations: DbConversation[]
  setConversations: (conversations: DbConversation[]) => void
}

export const useConversation = create<ConversationStore>((set) => ({
  conversations: [],
  setConversations: (conversations: DbConversation[]) => set({ conversations })
}))
