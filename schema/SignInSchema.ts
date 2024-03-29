import * as Yup from 'yup';

const SignInSchema = Yup.object({
    email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Ingresa un email valido')
        .required('Campo requerido'),
    password: Yup.string()
        .min(6, 'Minimo 6 caracteres')
        .required('Campo Requerido'),
}) 

export default SignInSchema;