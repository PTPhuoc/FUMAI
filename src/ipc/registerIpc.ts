import { chatDefault } from './chat'
import { sURL } from './security'

// src/ipc/registerIpc.ts
export function registerIpc(): void {
  sURL()
  chatDefault()
}
