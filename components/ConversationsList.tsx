import React from 'react'
import { useStore, useConversationStore } from '../store/useStore';
import { useEffect } from 'react';
import { getConversations } from '../services/chat';
import { getAccessToken } from '../services/user';
import Link from 'next/link';

export const ConversationsList = () => {

  const user = useStore(state => state.user);
  const conversationList = useConversationStore(state => state.conversationsList)
  const getConversationsList = useConversationStore(state => state.getConversationsList)


  useEffect(() => {
    const loadConversations = async () => {
      try {
        const token = await getAccessToken({ token: user?.token || 'No token' });
        const conversationList = await getConversationsList(token)
        console.log(conversationList);
      } catch (err) {
        console.log('err', err)
      }

    }
    if (!conversationList) loadConversations();
  }, []);

  if (!conversationList) return (<>Loading Conversations...</>)

  return (
    <ul className='w-full'>
      {conversationList?.items?.map(({ channelState: { uniqueName = '' } = {} }: any) => (
        <li key={uniqueName} className='flex flex-col '>
          <button className='inline-flex p-0 gap-4 mt-3  items-center'>
            <img src={`https://i.pravatar.cc/150?u=${uniqueName}`} className='w-14 rounded-full border-2 border-blue-500' />
            <Link href={`/room/${uniqueName}`} >{uniqueName}</Link>
          </button>

        </li>
      ))}
    </ul>
  )
}
