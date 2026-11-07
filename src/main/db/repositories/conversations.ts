import { randomUUID } from 'crypto'
import { db } from '../client'
import { conversations } from '../schema'
import type { DbConversation, CreateConversationInput, InforHandle } from '../../../types/globals'
import { and, eq, desc } from 'drizzle-orm'
// src/main/db/repositories/conversations.ts
export function getConversations(): DbConversation[] {
  return db.select().from(conversations).orderBy(desc(conversations.updatedAt)).all()
}

export function createConversation(input: CreateConversationInput): DbConversation {
  const title = input.title?.trim()
  const model = input.model?.trim()

  if (!title) throw new Error('Title not empty')
  if (!model) throw new Error('Model not empty')

  const now = Date.now()
  const row = db
    .insert(conversations)
    .values({
      id: randomUUID(),
      title,
      model,
      titleSource: 'auto',
      createdAt: now,
      updatedAt: now
    })
    .returning()
    .get()

  return row
}

export const deleteConversation = (conversationId: string): InforHandle => {
  const result = db.delete(conversations).where(eq(conversations.id, conversationId)).run()

  if (result.changes === 0) {
    return {
      status: 'Error',
      message: 'Conversation not found'
    }
  }
  return {
    status: 'Success',
    message: 'Conversation deleted successfully'
  }
}

export function changeTitle(conversationId: string, title: string): InforHandle {
  const result = db
    .update(conversations)
    .set({
      title,
      titleSource: 'user',
      updatedAt: Date.now()
    })
    .where(eq(conversations.id, conversationId))
    .run()

  if (result.changes === 0) {
    return {
      status: 'Error',
      message: 'Conversation not found'
    }
  }
  return {
    status: 'Success',
    message: 'Title updated successfully'
  }
}

export function modelChangeTitle(conversationId: string, title: string): InforHandle {
  const result = db
    .update(conversations)
    .set({
      title,
      titleSource: 'generated',
      updatedAt: Date.now()
    })
    .where(and(eq(conversations.id, conversationId), eq(conversations.titleSource, 'auto')))
    .run()

  if (result.changes === 0) {
    return {
      status: 'Failure',
      message: 'Conversation not found or User changed title'
    }
  }
  return {
    status: 'Success',
    message: 'Title updated successfully'
  }
}
