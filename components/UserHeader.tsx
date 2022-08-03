import React, { useState } from 'react'
import { useFormik } from 'formik'
import { supabase } from '../utils/subabaseClient';
import validationSchema from '../schema/SignInSchema'
import Logo from '../assets/Logo';
import { useStore } from '../store/useStore';
import { LoggedUserHead } from './LoggedUserHead';
import Link from 'next/link';
import { Label, TextInput } from 'flowbite-react';

interface SignInFields {
  email: string;
  password: string;
}

const UserHeader = () => {

  const user = useStore(state => state.user);

  return (
    <header className='flex flex-col items-center justify-between h-full'>
      {user
        ? <LoggedUserHead />
        : <LoginForm />
      }
    </header>
  )
}

const LoginForm = () => {

  const [loading, setLoading] = useState(false);
  const setUser = useStore(state => state.setUser);

  const onSubmit = async (values: SignInFields) => {
    console.log(values);
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn(values)
      if (error == null) {
        const name = user?.user_metadata.userName;
        setUser({
          name,
          avatar: `https://i.pravatar.cc/150?u=${name}`,
          token: session?.access_token || 'no token'
        });
      } else {
        alert(`Ha ocurrido un error: ${error.message}`)
      }
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  const initialValues: SignInFields = { email: '', password: '' };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,

  });

  const { email, password } = values;

  return (
    <div className='flex flex-col justify-between h-full'>
      <span className='logo' >
        <Logo className='logo'/>
      </span>

      <form className='flex-1 w-72' onSubmit={handleSubmit}>
        <div className="mb-1 block">
          <Label
            htmlFor="email"
            value="Ingresa Correo"
          />
        </div>

        <TextInput
          onChange={handleChange}
          value={email}
          name='email'
          type='text'
          helperText={errors['email']}
          placeholder='Username'
        />

        <div className="mb-1 mt-3 block">
          <Label
            htmlFor="password"
            value="Contraseña"
          />
        </div>
        <TextInput
          onChange={handleChange}
          value={password}
          name='password'
          type='password'
          helperText={errors['password']}
          placeholder='Contraseña'
        />
        <div className='mt-10 flex justify-between items-center'>
          {!loading ? <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 font-medium rounded-md text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">Sign In</button> : <h5>Loading...</h5>}
          <Link href='/forgotPass'><p className='font-bold text-sm text-blue-500 '>Forgot Password?</p></Link>
        </div>
      </form>
      <footer className='flex-2 pt-24'>
          <div className='text-center'>
          <p className='text-sm text-gray-400'>Not a user yet? <Link href='/signUp'><span className='text-blue-300 underline'>Create Account</span></Link></p>
          </div>
      </footer>
    </div>

  )
}

export default UserHeader;