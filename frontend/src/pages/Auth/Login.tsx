// LoginForm.tsx
import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { ContextGlobal } from '../../contexts/Global.context';

type LoginFormData = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const navigate = useNavigate()
    let { setToken } = useContext(ContextGlobal)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        await axios.post("/auth/login", data)
            .then(resp => {
                sessionStorage.setItem('token', resp.data.token);
                setToken(resp.data.token)
                navigate('/home')
            })
            .catch(error => toast.error(error?.response?.data?.error || error?.response || ""))
    };

    return (
        <form className='Login' id="login" onSubmit={handleSubmit(onSubmit)}>
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

            <Button type="submit">Entrar</Button>

            <Link to="/auth/register">Quero me registrar</Link>
        </form>
    );
};

export default LoginForm;
