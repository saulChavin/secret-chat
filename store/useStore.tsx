import create from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { ActiveConversationSlice, createActiveConversationSlice } from './slices/conversation.slice';
import { UserSlice, createUserSlice } from './slices/user.slice';

const dummyStorageApi = {
  getItem: () => null,
  setItem: () => undefined,
}

export const useStore = create<UserSlice>()(
  persist(
    (...a) => ({
      //@ts-ignore
      ...createUserSlice(...a)
    }),
    {
      name: 'global-app', // unique name
      //@ts-ignore
      storage: typeof window !== 'undefined' ? window.sessionStorage : dummyStorageApi,
    }
  )

)
export const useConversationStore = create<ActiveConversationSlice>()(
  (...a) => ({
    ...createActiveConversationSlice(...a),
  }),
)