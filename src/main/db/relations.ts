// src/main/db/relations.ts
import { defineRelations } from 'drizzle-orm'
import * as schema from './schema'

export const relations = defineRelations(schema, (r) => ({
  conversations: {
    messages: r.many.messages({
      from: r.conversations.id,
      to: r.messages.conversationId
    })
  },
  messages: {
    conversation: r.one.conversations({
      from: r.messages.conversationId,
      to: r.conversations.id
    })
  }
}))
