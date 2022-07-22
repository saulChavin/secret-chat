import { StateCreator } from 'zustand';
import { User } from '../../interface/User';

export interface UserSlice {
    user: User | null; 
    setUser: (user: User | null) => void;
}

export const createUserSlice: StateCreator<
UserSlice,
[],
[],
UserSlice> = (set, get) => ({
    user: null,
    setUser: (user) => set(() => ({user}))
});