import { create } from 'zustand'

// src/renderer/src/stores/useSetting.ts
type SettingStore = {
  theme: 'dark' | 'light' | 'system'
  model: string
  setTheme: (theme: 'dark' | 'light' | 'system') => void
  setModel: (model: string) => void
}

export const useSetting = create<SettingStore>((set) => ({
  theme: 'system',
  model: 'qwen3-coder:30b',
  setTheme: (theme) => set({ theme }),
  setModel: (model) => set({ model })
}))
