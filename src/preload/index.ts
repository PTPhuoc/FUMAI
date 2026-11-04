import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { Messages } from '../types/globals'

// src/preload/index.ts
const api = {
  chatDefault: (message: Messages[]): Promise<Messages> =>
    ipcRenderer.invoke('chatDefault', message),
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
