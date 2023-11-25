import { Request, Response } from 'express';
import Task from '../models/task.model';
import { UserDocument } from '../models/user.model';

export const registerTask = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDocument;
        const { data } = req.body;
        const { title, description, color, isFavorite } = data;

        const taskDB = await Task.create({ _user: user._id, title, description, color, isFavorite });

        res.status(201).json({ data: taskDB });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDocument;
        const { isFavorite, color, title, description } = req.query;

        const query: any = { _user: user._id };
        if (isFavorite !== undefined) query.isFavorite = isFavorite === 'true';
        if (title !== undefined) query.title = { $regex: title, $options: 'i' };
        if (description !== undefined) query.description = { $regex: description, $options: 'i' };
        if (color !== undefined) query.color = color;

        const tasksDB = await Task.find(query);

        res.json({ data: tasksDB });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDocument;
        const taskId = req.params.taskId;
        const { data } = req.body;
        const { title, description, color, isFavorite } = data;

        const taskDB = await Task.findOneAndUpdate(
            { _id: taskId, _user: user._id },
            { title, description, color, isFavorite },
            { new: true }
        );
        if (!taskDB) return res.status(404).json({ error: 'Tarefa não encontrada' });

        res.json({ data: taskDB });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDocument;
        const taskId = req.params.taskId;

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, _user: user._id });
        if (!deletedTask) return res.status(404).json({ error: 'Tarefa não encontrada' });

        res.json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// export const getFavoriteTasks = async (req: Request, res: Response) => {
//     try {
//         const user = req.user as UserDocument;

//         let query = { _user: user._id, isFavorite: true }
//         const totalTasks = await Task.countDocuments(query)
//         const favoriteTasks = await Task.find(query)

//         res.json({ data: favoriteTasks, total: totalTasks });
//     } catch (error) {
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// };

// export const getNonFavoriteTasks = async (req: Request, res: Response) => {
//     try {
//         const user = req.user as UserDocument;

//         let query = { _user: user._id, isFavorite: false }
//         const totalTasks = await Task.countDocuments(query)
//         const favoriteTasks = await Task.find(query);

//         res.json({ data: favoriteTasks, total: totalTasks });
//     } catch (error) {
//         res.status(500).json({ error: 'Erro interno do servidor' });
//     }
// };

