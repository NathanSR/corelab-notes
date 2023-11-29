import './TaskCreator.css'
import { TbStar, TbStarFilled } from "react-icons/tb";
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { useLayoutEffect, useRef, useState } from 'react';
import { IoIosSave } from "react-icons/io";
import Swal from 'sweetalert2';
import Button from '../Button';

import { BiPencil } from "react-icons/bi";
import { PiPaintBucket } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { listColors } from './TaskCreator.utils';

interface TaskCreatorProps {
    method: 'POST' | 'PUT' | 'GET' | 'DELETE';
    values?: {
        _id: string;
        title: string;
        description?: string;
        isFavorite: boolean;
        color?: string;
    };
    onSuccess: () => void
}

const defaultValues = {
    _id: undefined,
    title: '',
    description: '',
    isFavorite: false,
    color: '#FFFFFF',
    onSuccess: () => { }
};

const TaskCreator: React.FC<TaskCreatorProps> = ({ method, values = defaultValues, onSuccess }) => {

    let [title, setTitle] = useState(values.title);
    let [description, setDescription] = useState(values.description);
    let [color, setColor] = useState(values.color);
    let [isFavorite, setIsFavorite] = useState(values.isFavorite);

    let [methodURL, setMethodURL] = useState(method);

    let [isPaletteOpen, setIsPaletteOpen] = useState(false)
    useLayoutEffect(() => { if (methodURL === "GET") setIsPaletteOpen(false) }, [methodURL])

    // Ajustar dinamicamente a altura do textarea description com base no conteúdo
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [description]);
    // Quando apertar Enter na Descrição, deve submeter o formulário
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
        }
    }

    const onSubmit = async () => {
        await axios({
            method: methodURL,
            url: `/tasks/${(['PUT', 'DELETE'].includes(methodURL)) ? values._id : ""}`,
            data: { data: { title, description, color, isFavorite } }
        })
            .then(() => toast.success("Ação realizada com sucesso!"))
            .then(() => {
                if (methodURL === "POST") {
                    setTitle("")
                    setDescription("")
                    setColor("")
                    setIsFavorite(false)
                    setIsPaletteOpen(false)
                }
                if (methodURL === "PUT") setMethodURL("GET")
            })
            .then(onSuccess)
            .catch(error => toast.error(error?.response?.data?.error || error?.response || ""))
    }

    const onDelete = async () => {
        Swal.fire({
            title: 'Confirmar Exclusão',
            text: 'Tem certeza que deseja excluir?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(async (result) => {
            if (result.isConfirmed) {
                methodURL = 'DELETE'
                setMethodURL(methodURL);
                await onSubmit().catch(() => setMethodURL("PUT"))
            }
        })
    }

    const toggleMethods = () => {
        if (methodURL === "PUT") {
            setTitle(values.title)
            setDescription(values.description)
            setIsFavorite(values.isFavorite)
            setColor(values.color)
            setMethodURL("GET")
        }
        if (methodURL === "GET") setMethodURL("PUT")
    }

    const onSelectColor = (colorSelected: string) => {
        if (colorSelected === color) color = ""
        else color = colorSelected
        setColor(color)
    }


    return (
        <form className={`TaskCreator ${methodURL}`} onSubmit={(e) => e.preventDefault()}>
            <div className="bg-back" onClick={toggleMethods}></div>
            <div className="content" style={{ backgroundColor: color }}>
                <header>
                    <input
                        type="text"
                        placeholder='Título'
                        value={title}
                        onChange={e => setTitle(e.target.value || "")}
                        disabled={methodURL === "GET"}
                    />
                    <label>
                        <input
                            style={{ display: 'none' }}
                            type='checkbox'
                            checked={isFavorite}
                            onChange={e => setIsFavorite(e.target.checked)}
                            disabled={methodURL === "GET"}
                        />
                        {isFavorite ? <TbStarFilled color='orange' /> : <TbStar color='#34454d' />}
                    </label>
                </header>
                <main>
                    <textarea
                        ref={textareaRef}
                        placeholder='Criar nota...'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={methodURL === "GET"}
                    />
                </main>
                <footer>
                    <div>
                        {(['PUT'].includes(methodURL)) && <Button title='Fechar' className='P' icon={<IoMdClose />} onClick={toggleMethods} />}
                        {(['GET'].includes(methodURL)) && <Button title='Editar' className='P' icon={<BiPencil />} onClick={toggleMethods} />}
                        <div>
                            {(['PUT', 'POST'].includes(methodURL)) && <Button title='Alterar Cor' className='P' icon={<PiPaintBucket />} onClick={() => setIsPaletteOpen(!isPaletteOpen)} />}
                            {isPaletteOpen && <div className="Palette">
                                {listColors.map(item => <div
                                    className={`color ${(item.color === color) ? "selected" : ""}`}
                                    style={{ backgroundColor: item.color }}
                                    onClick={() => onSelectColor(item.color)}
                                />)}
                            </div>}
                        </div>
                    </div>
                    <div>
                        {(['PUT', 'DELETE'].includes(methodURL)) && <Button title='Deletar' className='P' icon={<CiTrash />} onClick={onDelete} />}
                        {(['PUT', 'POST'].includes(methodURL)) && <Button title='Salvar' className='P' type='submit' icon={<IoIosSave />} onClick={onSubmit} />}
                    </div>
                </footer>
            </div>
        </form>
    )
}

export default TaskCreator;