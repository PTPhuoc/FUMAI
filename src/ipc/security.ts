import { ipcMain, shell } from 'electron'

// src/ipc/security.ts
export const sURL = (): void => {
  ipcMain.handle('sURL', async (_event, url: string) => {
    try {
      const parsed = new URL(url)
      if (parsed.protocol != 'http:' && parsed.protocol != 'https:') {
        throw new Error('Only http and https are supported')
      }
      await shell.openExternal(url)
    } catch (error) {
      console.error(error)
    }
  })
}
