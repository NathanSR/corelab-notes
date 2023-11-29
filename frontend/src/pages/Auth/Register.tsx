// RegistrationForm.tsx
import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { ContextGlobal } from '../../contexts/Global.context';

type RegistrationFormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm: React.FC = () => {
    const navigate = useNavigate()
    let { setToken } = useContext(ContextGlobal)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegistrationFormData>();

    const onSubmit: SubmitHandler<RegistrationFormData> = async (data) => {
        await axios.post("/auth/register", data)
            .then(resp => {
                sessionStorage.setItem('token', resp.data.token);
                setToken(resp.data.token)
                navigate('/home')
            })
            .catch(error => toast.error(error?.response?.data?.error || error?.response || ""))
    };

    return (
        <form className='Register' id="register" onSubmit={handleSubmit(onSubmit)}>
            <div className='input'>
                <label htmlFor="name">Nome Completo:</label>
                <input type="text" id="name" {...register('name', { required: 'Seu Nome deve ser informado' })} />
                <div className='error'>{errors.name?.message}</div>
            </div>

            <div className='input'>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" {...register('email', { required: 'Seu Email deve ser informado' })} />
                <div className='error'>{errors.email?.message}</div>
            </div>

            <div className='input'>
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" {...register('password', { required: 'Sua Senha deve ser informada' })} />
                <div className='error'>{errors.password?.message}</div>
            </div>

            <div className='input'>
                <label htmlFor="confirmPassword">Repita sua Senha para Confirmar:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                        required: 'Você precisa confirmar a sua senha',
                        // validate: (value) => value === register('password').value || 'Senhas devem coincidir',
                    })}
                />
                <div className='error'>{errors.confirmPassword?.message}</div>
            </div>

            <Button type="submit">Registrar</Button>

            <Link to="/auth/login">Já possuo uma conta</Link>
        </form>
    );
};

export default RegisterForm;
