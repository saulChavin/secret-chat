import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useState } from 'react';
import PlusCircle from '../assets/PlusCircle';
import { createOrJoinConversation } from '../services/chat';
import { getAccessToken } from '../services/user';
import { useConversationStore, useStore } from '../store/useStore';

export const CreateRoomForm = () => {

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
        <button className='inline-flex items-center p-0 mt-8 gap-4 self-start'>
            <PlusCircle />
            <h2 className='text-2xl'>New Chat</h2>
        </button>

        // <form onSubmit={handleSubmit}>
        //     <input onChange={handleChange} className='form-input' type='text' placeholder='Ingrese el nombre de la sala' />
        //     <button type='submit' className='bg-slate-500 p-2 '>Entrar</button>
        // </ form>
    )
}

