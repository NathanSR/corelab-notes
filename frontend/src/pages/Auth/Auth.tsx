import './Auth.css';
import { useNavigate, useParams } from 'react-router-dom';
import LoginForm from './Login';
import RegisterForm from './Register';
import Logo from '../../components/Logo';
import { Routes, Route } from 'react-router-dom';
import Button from '../../components/Button';
import { RiArrowGoBackFill } from "react-icons/ri";

export default function Auth() {
    let navigate = useNavigate()

    return <div className='Auth'>
        <Button className='btn-back' onClick={() => navigate('/')} icon={<RiArrowGoBackFill />}>Início</Button>

        <div className="Auth-container">
            <header>
                <Logo />
            </header>
            <div className="forms">
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </div>
        </div>



    </div>
}