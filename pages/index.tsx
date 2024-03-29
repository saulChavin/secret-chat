import type { NextPage } from 'next'
import Head from 'next/head'
import { useStore } from '../store/useStore';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Link from 'next/link';
import { Button, Tabs } from 'flowbite-react';

const RoomSelection = dynamic(() => import('../components/RoomSelection'), {
  ssr: false,
})

const UserHeader = dynamic(() => import('../components/UserHeader'), {
  ssr: false,
})

const Home: NextPage = () => {

  const user = useStore(state => state.user);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <UserHeader />
      {user &&
        <div className='flex flex-col items-center mt-4 mx-4'>
          <Button.Group>
            <Button color="gray">
              {' '}Profile
            </Button>
            <Button color="gray">
              {' '}Settings
            </Button>
            <Button color="gray">
              {' '}Messages
            </Button>
          </Button.Group>
          <RoomSelection />
        </div>
      }


    </>
  )
}

export default Home
