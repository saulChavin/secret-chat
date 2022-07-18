import * as Yup from 'yup';

const SignUpSchema = Yup.object({
    userName: Yup.string().required('Nombre de usuario requerido'),
    email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Ingresa un email valido')
        .required('Campo requerido'),
    password: Yup.string()
        .min(6, 'minimo 6 caracteres')
        .required('Campo Requerido'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .min(6, 'minimo 6 caracteres')
        .required()

}) 

export default SignUpSchema;