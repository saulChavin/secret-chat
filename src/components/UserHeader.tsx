import React, { useState } from 'react'
import { useFormik } from 'formik'
import { supabase } from '../utils/subabaseClient';
import validationSchema from '../schema/SignInSchema'
import { useRouter } from 'next/router'
import { useStore } from '../store/useStore';
import { LoggedUserHead } from './LoggedUserHead';
import Link from 'next/link';
import { TextInput } from 'flowbite-react';

interface SignInFields {
  email: string;
  password: string;
}

const UserHeader = () => {

  const [loading, setLoading] = useState(false);
  const user = useStore(state => state.user);
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
    validateOnBlur: true,

  });

  const { email, password } = values;

  return (
    <header>
      {user
        ? <LoggedUserHead />
        : <form className='flex flex-col items-center' onSubmit={handleSubmit}>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={email}
            name='email'
            type='text'
            placeholder='Correo electrónico'
          />
          <small >{touched['email'] ? errors['email'] : ''}</small>
          <TextInput
            onChange={handleChange}
            onBlur={handleBlur}
            value={password}
            name='password'
            type='password'
            placeholder='Contraseña'
          />
          <small >{touched['password'] ? errors['password'] : ''}</small>
          {!loading ? <button type='submit'>Entrar</button> : <h5>Loading...</h5>}
          <Link href='/signUp'>Registrarse</Link>
        </form>
      }

    </header>
  )
}

export default UserHeader;