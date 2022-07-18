import React, { useEffect } from 'react'
import { useStore, useConversationStore } from '../../src/store/useStore';
import { Conversation } from '../../src/components/Conversation';
import { SendMessageInput } from '../../src/components/SendMessageInput';
import { useRouter } from 'next/router';
import { getAccessToken } from '../../src/services/user';
import Link from 'next/link';

const Room = () => {

    const getConversation = useConversationStore(state => state.getConversation);
    const user = useStore(state => state.user);
    const { query, isReady } = useRouter(); const activeConversation = useConversationStore(state => state.activeConversation);

    useEffect(() => {
        if (isReady) {
            const roomId = query['room-id']
            if (!activeConversation && roomId) {
                getAccessToken({ token: user?.token || 'No Token' })
                    .then(token => {
                        getConversation(roomId as string, token)
                            .catch((err) => console.log('error conversation', err))
                    })
            }
        }
    }, [isReady])

    if (!activeConversation) return (<>Recuperando conversation</>)

    return (
        <div>
            <Link href='/'>Back</Link>
            <h2 className='text-3xl'>{activeConversation?.uniqueName}</h2>
            <button >Add pals</button>
            <Conversation />
            <SendMessageInput />
        </div>
    )
}

export default Room
