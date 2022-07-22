import type { NextPage } from 'next'
import Head from 'next/head'
import { useStore } from '../store/useStore';
import { SignUpForm } from '../components/SignUpForm';

const Home: NextPage = () => {

  const user = useStore(state => state.user);
  return (
    <div className=''>
      <Head>
        <title>Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignUpForm />
      {/* <UserHeader />
      {user && <RoomSelection /> } */}
    </div>
  )
}

export default Home
