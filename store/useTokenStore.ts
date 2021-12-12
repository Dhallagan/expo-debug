import create from 'zustand'

export const [useStore] = create(set => ({
    hasToken: false,
    login:  () => set({ hasToken: true }),
    logout: () => set({ hasToken: false })
  }))