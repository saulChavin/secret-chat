import React, { useState } from 'react'
import { useFormik } from 'formik'
import { supabase } from '../utils/subabaseClient';
import validationSchema from '../schema/SignUpSchema'
import { useRouter } from 'next/router'

interface SignUpFields {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const SignUpForm = () => {

    const [loading, setLoading] = useState(false);
    const { push } = useRouter();
    const onSubmit = async (values: SignUpFields) => {
        console.log(values);
        try {
            setLoading(true)
            const { error } = await supabase.auth.signUp(
                {
                    email,
                    password,
                }, { data: { userName } }
            )
            if (error == null) {
                push('/');
            } else {
                console.log('error', error)
                alert(`Ha ocurrido un error: ${error.message}`)
            }
        } catch (error: any) {
            alert(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    const initialValues: SignUpFields = { userName: '', email: '', password: '', confirmPassword: '' };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        validateOnChange: false,
        validateOnBlur: true,

    });

    const { userName, email, password, confirmPassword } = values;

    return (
        <form className='flex flex-col items-center' onSubmit={handleSubmit}>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={userName}
                name='userName'
                type='text'
                placeholder='Nombre de usuario'
            />
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={email}
                name='email'
                type='text'
                placeholder='Correo electrónico'
            />
            <small >{touched['email'] ? errors['email'] : ''}</small>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={password}
                name='password'
                type='password'
                placeholder='Contraseña'
            />
            <small >{touched['password'] ? errors['password'] : ''}</small>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={confirmPassword}
                name='confirmPassword'
                type='password'
                placeholder='Confirmar contraseña'
            />
            <small >{touched['confirmPassword'] ? errors['confirmPassword'] : ''}</small>
            {!loading ? <button type='submit'>Registrarse</button> : <h5>Loading...</h5>}
        </form>
    )
}