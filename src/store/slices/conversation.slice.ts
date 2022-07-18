import { StateCreator } from 'zustand';
import { getConversation, getConversations } from '../../services/chat';
import { UserSlice } from './user.slice';
import { ConversationsList } from '../../components/ConversationsList';

export interface ActiveConversationSlice {
    activeConversation: any | null;
    conversationsList: any | null;
    setActiveConversation: (conversation: any) => void;
    setConversationList: (conversation: any) => void;
    getConversation: (uniqueName: string, token?: string) => Promise<void>;
    getConversationsList: (token?: string) => Promise<void>
}

export const createActiveConversationSlice: StateCreator<
    ActiveConversationSlice,
    [],
    [],
    ActiveConversationSlice> = (set, get) => ({
        activeConversation: null,
        conversationsList: null,
        setActiveConversation: (conversation) => set(() => ({ activeConversation: conversation })),
        setConversationList: (conversations) => set(() => ({conversationsList: conversations})),
        getConversation: async (uniqueName, token) => {
            try {
                const conversation = await getConversation(uniqueName, token)
                set(() => (({ activeConversation: conversation })))
            } catch (err) {
                console.log('err', err);
            }
        },
        getConversationsList: async (token?) => {
            try {
                console.log('token', token)
                const conversations = await getConversations(token);
                console.log('conversations', conversations);
                set(() => (({ conversationsList: conversations })))
            } catch (err) {
                console.log('err', err);
            }
        },
    });