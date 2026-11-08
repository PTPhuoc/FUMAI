import { create } from 'zustand'

// src/renderer/src/stores/useUI.ts
type UIStore = {
  isMainBar: boolean
  cancelBackground: { isOpen: boolean; target: string }
  toggleMainBar: () => void
  setIsMainBar: (isMainBar: boolean) => void
  setCancelBackground: ({ isOpen, target }: { isOpen: boolean; target: string }) => void
}

export const useUI = create<UIStore>((set) => ({
  isMainBar: false,
  cancelBackground: { isOpen: false, target: '' },
  toggleMainBar: () => set((state) => ({ isMainBar: !state.isMainBar })),
  setIsMainBar: (isMainBar: boolean) => set(() => ({ isMainBar })),
  setCancelBackground: ({ isOpen, target }) => set(() => ({ cancelBackground: { isOpen, target } }))
}))
