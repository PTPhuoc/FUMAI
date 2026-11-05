import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

// src/main/db/schema.ts
export const conversations = sqliteTable('conversations', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  model: text('model').notNull(),
  titleSource: text('title_source', {
    enum: ['auto', 'generated', 'user']
  })
    .notNull()
    .default('auto'),
  createdAt: integer('created_at').notNull(),
  updatedAt: integer('updated_at').notNull()
})

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  conversationId: text('conversation_id')
    .notNull()
    .references(() => conversations.id, { onDelete: 'cascade' }),
  role: text('role', { enum: ['user', 'assistant', 'system', 'tool'] }).notNull(),
  content: text('content').notNull(),
  createdAt: integer('created_at').notNull()
})
