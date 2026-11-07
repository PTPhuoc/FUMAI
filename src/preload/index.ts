import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  Messages,
  CreateConversationInput,
  CreateMessageInput,
  DbConversation,
  InforHandle
} from '../types/globals'

// src/preload/index.ts
const api = {
  // System
  chatDefault: (message: Messages[]): Promise<Messages> =>
    ipcRenderer.invoke('chatDefault', message),
  cvtGenerateTitle: (message: string): Promise<Messages> =>
    ipcRenderer.invoke('cvtGenerateTitle', message),

  // DB Conversation
  dbGetConversations: (): Promise<DbConversation[]> => ipcRenderer.invoke('dbGetConversations'),
  dbCreateConversation: (input: CreateConversationInput): Promise<DbConversation> =>
    ipcRenderer.invoke('dbCreateConversation', input),
  dbDeleteConversation: (conversationId: string): Promise<InforHandle> =>
    ipcRenderer.invoke('dbDeleteConversation', conversationId),
  dbModelChangeTitle: (conversationId: string, title: string): Promise<InforHandle> =>
    ipcRenderer.invoke('dbModelChangeTitle', conversationId, title),
  dbChangeTitle: (conversationId: string, title: string): Promise<InforHandle> =>
    ipcRenderer.invoke('dbChangeTitle', conversationId, title),
  // DB Message
  dbCreateMessage: (input: CreateMessageInput): Promise<void> =>
    ipcRenderer.invoke('dbCreateMessage', input),

  // Security
  sURL: (url: string): Promise<void> => ipcRenderer.invoke('sURL', url)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
