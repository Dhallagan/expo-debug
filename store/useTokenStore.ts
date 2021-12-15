import create from 'zustand'

export const [useTokenStore] = create(set => ({
    hasToken: false,
    token: null,
    login:  (token: string) => set({ hasToken: true, token: token }),
    logout: () => set({ hasToken: false, token: null })
  }))