import create from 'zustand'

export const [useTokenStore] = create(
  set => ({
    hasToken: false,
    token: null,
    login:  (token: string) => set({ hasToken: true, token: token }),
    logout: () => set({ hasToken: false, token: null })
  }))
  
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import create from 'zustand'
// import { persist } from "zustand/middleware";

// export const useTokenStore = create(persist(
//   (set) => ({
//     hasToken: false,
//     token: null,
//     login:  (token: string) =>{
//        set({ hasToken: true, token: token })
//     },
//     logout: () => {
//       set({ hasToken: false, token: null })
//     }
//   }),
//   {
//     name: "token-storage", // unique name
//     getStorage: () => AsyncStorage, // Add this here!
//   }
//   ))

// export const usePersistTokenStore = create(persist(
//   (set, get ) => ({
//     hasToken: false,
//     token: null,
//     login: (token: string) => set({ hasToken: true, token: token }),
//     logout: () => set({ hasToken: false, token: null })
//   }), 
//   {
//     name: "token-storage", // unique name
//     getStorage: () => AsyncStorage, // Add this here!
//   }
// ))
