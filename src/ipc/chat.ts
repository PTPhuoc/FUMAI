import { ipcMain } from 'electron'
import { Messages, ModelReply } from '../types/globals'
import { SYSTEM_GENERATE_TITLE } from '../main/prompts/title'

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

export const cGenerateTitle = (): void => {
  ipcMain.handle('cGenerateTitle', async (_event, message: string) => {
    const response = await fetch('http://100.109.94.22:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen3-coder:30b',
        messages: [
          { role: 'system', content: SYSTEM_GENERATE_TITLE },
          { role: 'user', content: "The user's first message: " + message }
        ],
        stream: false,
        options: {
          temperature: 0.3,
          num_predict: 50
        }
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
