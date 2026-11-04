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
