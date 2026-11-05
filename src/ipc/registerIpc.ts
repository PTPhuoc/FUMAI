import { chatDefault } from './chat'
import { sURL } from './security'
import { dbCreateConversation } from './database'

// src/ipc/registerIpc.ts
export function registerIpc(): void {
  sURL()
  chatDefault()
  dbCreateConversation()
}
