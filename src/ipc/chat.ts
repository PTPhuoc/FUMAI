import { ipcMain } from 'electron'
import { Messages, ModelReply } from '../types/globals'

// src/ipc/chat.ts
export const chatDefault = (): void => {
  ipcMain.handle('chatDefault', async (_event, messages: Messages[]) => {
    const response = await fetch('http://100.109.94.22:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen3-coder:30b',
        messages: messages,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`)
    }

    const data: ModelReply = await response.json()
    return {
      role: data.message.role,
      content: data.message.content
    }
  })
}
