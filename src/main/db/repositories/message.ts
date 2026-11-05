import { randomUUID } from 'crypto'
import { db } from '../client'
import { messages } from '../schema'
import type { InforHandle, CreateMessageInput, DbMessage } from '../../../types/globals'
import { and, eq } from 'drizzle-orm'
// src/main/db/repositories/chat.ts

export function createMessage(input: CreateMessageInput): DbMessage {
  const content = input.content.trim()
  if (!content) throw new Error('Content not empty')
  if (!input.conversationId) throw new Error('ConversationId not empty')
  if (!input.role) throw new Error('Role not empty')

  const now = Date.now()
  const row = db
    .insert(messages)
    .values({
      id: randomUUID(),
      conversationId: input.conversationId,
      role: input.role,
      content,
      createdAt: now
    })
    .returning()
    .get()

  return row
}
