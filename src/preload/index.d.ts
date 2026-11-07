import { ElectronAPI } from '@electron-toolkit/preload'
import {
  Messages,
  CreateConversationInput,
  CreateMessageInput,
  DbConversation,
  InforHandle
} from '../types/globals'

// scr/preload/index.d.ts
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      // System
      chatDefault: (messages: Messages[]) => Promise<Messages>
      cvtGenerateTitle: (message: string) => Promise<Messages>

      // DB Conversation
      dbGetConversations: () => Promise<DbConversation[]>
      dbCreateConversation: (input: CreateConversationInput) => Promise<DbConversation>
      dbDeleteConversation: (conversationId: string) => Promise<InforHandle>
      dbModelChangeTitle: (conversationId: string, title: string) => Promise<InforHandle>
      dbChangeTitle: (conversationId: string, title: string) => Promise<InforHandle>

      // DB Message
      dbCreateMessage: (input: CreateMessageInput) => Promise<DbConversation>

      // Security
      sURL: (url: string) => Promise<void>
    }
  }
}
