import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import './Home.css';
import { toast } from 'react-toastify';
import { ContextGlobal } from '../../contexts/Global.context';
import { useContext } from 'react';
import TaskCreator from '../../components/TaskCreator';
import axios from '../../services/axios';
import Button from '../../components/Button';
import Search from '../../components/Search';

interface Task {
    _id: string;
    title: string;
    description: string;
    isFavorite: boolean;
    color: string;
}

export default function Home() {
    let navigate = useNavigate()
    let { setToken } = useContext(ContextGlobal)

    const [tasks, setTasks] = useState<Task[]>([]);

    const goExit = () => {
        sessionStorage.removeItem('token')
        setToken("")
        toast.success("Você foi deslogado da aplicação!")
        navigate("/")
    }

    const onReset = () => axios.get("/tasks").then(resp => setTasks(resp.data.data)).catch(console.error)
    useEffect(() => { onReset() }, [])

    return <div className='Home'>
        <header>
            <Logo />
            <Search setItems={setTasks} />
            
            <div className="infoUser">
                <Button onClick={goExit}>Sair</Button>
            </div>
        </header>
        <main>
            <section className='creation'>
                <TaskCreator method='POST' onSuccess={onReset} />
            </section>
            <section className='favorites'>
                <h2>Favoritos</h2>
                <div className="list-tasks">
                    {tasks.filter(task => task.isFavorite).map(task => (
                        <TaskCreator method='GET' values={task} key={task._id} onSuccess={onReset} />
                    ))}
                </div>
            </section>
            <section className='others'>
                <h2>Outros</h2>
                <div className="list-tasks">
                    {tasks.filter(task => !task.isFavorite).map(task => (
                        <TaskCreator method='GET' values={task} key={task._id} onSuccess={onReset} />
                    ))}
                </div>
            </section>
        </main>
    </div>
}