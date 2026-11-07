import { chatDefault } from './chat'
import { sURL } from './security'
import {
  dbCreateConversation,
  dbCreateMessage,
  dbChangeTitle,
  dbModelChangeTitle,
  dbDeleteConversation,
  dbGetConversations
} from './database'
import { cvtGenerateTitle } from './converation'

// src/ipc/registerIpc.ts
export function registerIpc(): void {
  // System
  sURL()
  chatDefault()
  cvtGenerateTitle()

  // DB Conversation
  dbGetConversations()
  dbCreateConversation()
  dbDeleteConversation()
  dbChangeTitle()
  dbModelChangeTitle()

  // DB Message
  dbCreateMessage()
}
