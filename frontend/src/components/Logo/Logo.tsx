import { useNavigate } from "react-router-dom"
import './Logo.css'

export default function Logo() {
    let navigate = useNavigate()

    return (
        <div className='Logo' onClick={() => navigate('/')}>
            <img src='logo-corenotes.png' alt='coreNotes' />
            <span>CoreNotes</span>
        </div>
    )

}