import { useNavigate } from 'react-router-dom';
import './Initial.css';
import Logo from '../../components/Logo';

export default function Initial() {

    let navigate = useNavigate()

    return <div className='Initial'>
        <header>
            <Logo />
        </header>
        <main>
            <h1>Gerencie suas tarefas aqui na CoreNotes!</h1>
            <nav className='buttons'>
                <button className="register" onClick={() => navigate('/register')}>Registre-se</button>
                <button className="login" onClick={() => navigate('/login')}>Entrar</button>
            </nav>
            <img className='illustration' src='notes-undraw.svg' alt='notes' />
        </main>
    </div>

}