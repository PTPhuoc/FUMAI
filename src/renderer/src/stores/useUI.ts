import { create } from 'zustand'

// src/renderer/src/stores/useUI.ts
type UIStore = {
  isMainBar: boolean
  toggleMainBar: () => void
  setIsMainBar: (isMainBar: boolean) => void
}

export const useUI = create<UIStore>((set) => ({
  isMainBar: false,
  toggleMainBar: () => set((state) => ({ isMainBar: !state.isMainBar })),
  setIsMainBar: (isMainBar: boolean) => set(() => ({ isMainBar }))
}))
