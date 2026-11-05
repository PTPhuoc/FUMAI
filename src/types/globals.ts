// src/types/globals.ts

// System types
export type Messages = {
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
}

export type ModelReply = {
  model: string
  created_at: string
  message: {
    role: 'assistant' | 'tool'
    content: string
  }
  done: boolean
  done_reason: string
  total_duration: number
  load_duration: number
  prompt_eval_count: number
  prompt_eval_cached_count: number
  prompt_eval_duration: number
  eval_count: number
  eval_duration: number
}

export type InforHandle = {
  status: 'Success' | 'Error' | 'Not found' | 'Warning' | 'Failure'
  message: string
}

// Database types
export type DbConversation = {
  id: string
  title: string
  model: string
  titleSource: 'auto' | 'generated' | 'user'
  createdAt: number
  updatedAt: number
}

export type DbMessage = {
  id: string
  conversationId: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  createdAt: number
}

export type CreateConversationInput = {
  title: string
  model: string
}

export type CreateMessageInput = {
  conversationId: string
  role: 'user' | 'assistant' | 'system' | 'tool'
  content: string
}
