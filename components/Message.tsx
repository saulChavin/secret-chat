import React from 'react'
import { useStore } from '../store/useStore';

export interface Message {
    body: string;
    author: string;
}

export const MessageBubble = ({message: {body, author}} : {message: Message}) => {
    
    const user = useStore(state => state.user);
    const origin = author === user?.name ? 'local' : 'remote' 

  return (
    <div className={`m-2 w-3/6 ${origin}`}>
	<p className="m-0 p-0">{body}</p>
	<small className="text-xs">{author}</small>
</div>
  )
}
