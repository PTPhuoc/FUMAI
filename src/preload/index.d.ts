import { ElectronAPI } from '@electron-toolkit/preload'
import { Messages } from '../types/globals'

// scr/preload/index.d.ts
declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      chatDefault: (messages: Messages[]) => Promise<Messages>
      sURL: (url: string) => Promise<void>
    }
  }
}
