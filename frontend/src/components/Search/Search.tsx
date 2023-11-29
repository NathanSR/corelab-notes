import { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import './Search.css'
import { FaFilter } from 'react-icons/fa6'
import { listColors } from '../../pages/Home/TaskCreator/TaskCreator.utils';
import axios from '../../services/axios';
import { toast } from 'react-toastify';

interface SearchType {
    setItems: React.Dispatch<React.SetStateAction<any[]>>
}

const Search: React.FC<SearchType> = ({ setItems }) => {
    let [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    let [type, setType] = useState<"title" | "description">("title");
    let [favorite, setFavorite] = useState<boolean>(false);
    let [color, setColor] = useState<string>("");
    let [value, setValue] = useState<string>("")

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSubmit()
    };

    const handleSubmit = async () => {
        await axios(`/tasks`, {
            params: {
                isFavorite: favorite || undefined,
                color: color || undefined,
                title: type === "title" ? value : undefined,
                description: type === "description" ? value : undefined,
            }
        })
            .then(resp => setItems(resp.data.data))
            .catch(error => toast.error(error?.response?.data?.error || error?.response || ""))
    };

    return (
        <div className="Search" style={{ backgroundColor: color }}>
            <IoIosSearch title='Pesquisar' onClick={handleSubmit} />
            <input
                type='search'
                placeholder={`Pesquisar por ${type === "title" ? "Título" : "Descrição"}`}
                onKeyDown={handleKeyDown}
                onChange={e => setValue(e.target.value)}
            />
            <FaFilter
                title='Filtrar'
                color={favorite ? "orange" : isOpenFilter ? "gray" : ""}
                onClick={() => setIsOpenFilter(!isOpenFilter)}
            />
            {isOpenFilter && <div className="filters">
                <div className='type'>
                    <label> <input type="radio" value="title" checked={type === "title"} onChange={e => setType("title")} /> Título </label>
                    <label> <input type="radio" value="description" checked={type === "description"} onChange={e => setType("description")} /> Descrição </label>
                </div>
                <div>
                    <label> <input type="checkbox" checked={favorite} onChange={e => setFavorite(e.target.checked)} />Só Favoritos</label>
                </div>
                <div>
                    <label>
                        <select value={color} onChange={e => setColor(e.target.value)} style={{ backgroundColor: color }}>
                            <option value="">---</option>
                            {listColors.map(item => <option key={item.color} style={{ backgroundColor: item.color }} value={item.color}></option>)}
                        </select>
                        cor
                    </label>
                </div>
            </div>}
        </div>
    )
}

export default Search