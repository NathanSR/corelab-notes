import { useNavigate } from 'react-router-dom';
import './Initial.css';
import Logo from '../../components/Logo';
import Button from '../../components/Button';

export default function Initial() {

    let navigate = useNavigate()

    return <div className='Initial'>
        <header>
            <Logo />
        </header>
        <main>
            <h1>Gerencie suas tarefas aqui na CoreNotes!</h1>
            <nav className='buttons'>
                <Button className="register" onClick={() => navigate('/auth/register')}>Registre-se</Button>
                <Button className="login" onClick={() => navigate('/auth/login')}>Entrar</Button>
            </nav>
            <img className='illustration' src='notes-undraw.svg' alt='notes' />
        </main>
    </div>

}