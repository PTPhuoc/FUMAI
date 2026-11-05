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
      chatDefault: (messages: Messages[]) => Promise<Messages>
      cGenerateTitle: (message: string) => Promise<Messages>
      dbModelChangeTitle: (conversationId: string, title: string) => Promise<InforHandle>
      dbChangeTitle: (conversationId: string, title: string) => Promise<InforHandle>
      dbCreateMessage: (input: CreateMessageInput) => Promise<DbConversation>
      sURL: (url: string) => Promise<void>
      dbCreateConversation: (input: CreateConversationInput) => Promise<DbConversation>
    }
  }
}
