import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { useStore, useConversationStore } from '../store/useStore';
import { getAccessToken } from '../services/user';
import { createOrJoinConversation } from '../services/chat';
import { useRouter } from 'next/router';
import { ConversationsList } from './ConversationsList';
import { CreateRoomForm } from './CreateRoomForm';

const RoomSelection = () => {

    const [room, setRoom] = useState('');
    const user = useStore(state => state.user);
    const setActiveConversation = useConversationStore(state => state.setActiveConversation);
    const { push } = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoom(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || user?.token == null) return;

        const accessToken = await getAccessToken({ token: user.token });
        const conversation = await createOrJoinConversation({ room, accessToken })

        if (conversation) {
            setActiveConversation(conversation);
            push(`/room/${room}`)
        }
    }

    useEffect(() => {
        setActiveConversation(null); //null conversation on mount
    }, [setActiveConversation])

    return (
        <>
            <CreateRoomForm />
            <ConversationsList />
        </>


    )
}

export default RoomSelection
