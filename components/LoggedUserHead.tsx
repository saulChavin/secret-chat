import { useStore, useConversationStore } from '../store/useStore';

import React from 'react'
import { json } from 'stream/consumers';
import Logo from '../assets/Logo';
import Logout from '../assets/Logout';

export const LoggedUserHead = () => {

    const user = useStore(state => state.user);
    const setUser = useStore(state => state.setUser);
    const setConversationsList = useConversationStore(state => state.setConversationList);
    
    const handleLogout =()=> {
        setUser(null);
        setConversationsList(null);
    }

    return (
        <nav className='flex justify-center items-center py-2 relative w-full'>
        <Logo width={15} height={15}/>
        <h1 className='text-sm mx-1 text-blue-500'>ChatRoom</h1>
        <button className='absolute right-2' onClick={handleLogout}><Logout/></button>
    </nav>
        // <div className='inline-flex bg-zinc-400 w-full justify-between items-center p-2'>
        //     <div className='inline-flex space-x-2 items-center'>
        //         <img className='rounded-full h-8 w-8' alt={user?.name} src={user?.avatar} />
        //         <strong className='flex-grow-0'>{user?.name}</strong>
        //     </div>

        //     <button className='justify-self-end' onClick={handleLogout}>Logout</button>
        // </div>
    )
}
