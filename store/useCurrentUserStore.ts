import create from 'zustand'

export const [useCurrentUserStore] = create(set => ({
    me: {},
    setMe:  (user: any) => set({ me: user }),
    removeMe: () => set({ hasToken: false, token: null })
  }))