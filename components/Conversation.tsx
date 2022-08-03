import React, { useState } from 'react'
import { useEffect } from 'react';
import { useStore, useConversationStore } from '../store/useStore';
import { Message, MessageBubble } from './Message';

export const Conversation = () => {

    const activeConversation = useConversationStore(state => state.activeConversation);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const loadMessages = async () => {
            const paginator = await activeConversation?.getMessages();
            console.log('paginator', paginator)
            setMessages(paginator?.items);
            try{
                activeConversation.on('messageAdded', (message: Message) => {
                    setMessages(prevMessages => [...prevMessages, message]);
                })   
            }catch(err) {
                console.log('pillao')
            }
        }
        loadMessages();
    }, [activeConversation]);

    return (
        <div>
            {messages?.map((message, idx) => <MessageBubble key={`${message.body}-${idx}`} message={message} />)}
        </div>
    )
}
