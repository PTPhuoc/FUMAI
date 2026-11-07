import { ipcMain } from 'electron'
import { ModelReply } from '../types/globals'
import { SYSTEM_GENERATE_TITLE } from '../main/prompts/title'

export const cvtGenerateTitle = (): void => {
  ipcMain.handle('cvtGenerateTitle', async (_event, message: string) => {
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
