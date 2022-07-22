import React, { KeyboardEvent } from 'react'
import { useRef, useState, useEffect } from 'react';
import { useConversationStore } from '../store/useStore';
import { useRouter } from 'next/router';
import { getConversation } from '../services/chat';

export const SendMessageInput = () => {

    const [message, setMessage] = useState('');
    const activeConversation = useConversationStore(state => state.activeConversation);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(evt.target.value)
    }

    const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        if (evt.key === 'Enter') {
            activeConversation.sendMessage(message)
            setMessage('')
        }
    }

    return (
        <div className="mt-5" >
            <input
                value={message}
                className="p-2 border-gray-700 w-full border-2"
                onChange={handleChange}
                onKeyDown={(evt) => handleKeyDown(evt)}
                type="text"
                placeholder="Escribe tu mensaje aquí"
            />
        </div>
    )
}
