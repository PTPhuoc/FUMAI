import { ipcMain } from 'electron'
import {
  createConversation,
  changeTitle,
  modelChangeTitle,
  getConversations,
  deleteConversation
} from '../main/db/repositories/conversations'
import { createMessage } from '../main/db/repositories/message'
import { CreateConversationInput, CreateMessageInput } from '../types/globals'

// src/ipc/database.ts

// Conversation
export const dbGetConversations = (): void => {
  ipcMain.handle('dbGetConversations', async () => {
    return getConversations()
  })
}

export const dbCreateConversation = (): void => {
  ipcMain.handle('dbCreateConversation', async (_event, input: CreateConversationInput) => {
    return createConversation(input)
  })
}

export const dbDeleteConversation = (): void => {
  ipcMain.handle('dbDeleteConversation', async (_event, conversationId: string) => {
    return deleteConversation(conversationId)
  })
}

export const dbModelChangeTitle = (): void => {
  ipcMain.handle('dbModelChangeTitle', async (_event, conversationId: string, title: string) => {
    return modelChangeTitle(conversationId, title)
  })
}

export const dbChangeTitle = (): void => {
  ipcMain.handle('dbChangeTitle', async (_event, conversationId: string, title: string) => {
    return changeTitle(conversationId, title)
  })
}

// Message

export const dbCreateMessage = (): void => {
  ipcMain.handle('dbCreateMessage', async (_event, input: CreateMessageInput) => {
    return createMessage(input)
  })
}
