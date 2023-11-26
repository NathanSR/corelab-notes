import { Request, Response } from 'express';
import User, { UserDocument } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';

const createToken = (uid: any) => {
    const secretKey: Secret = process.env.SECRET_KEY || 'secret';
    return jwt.sign({ id: uid }, secretKey, { expiresIn: '1d', });
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, confirmPassword } = req.body;

        try {
            if (!name) throw 'Nome de usuário deve ser informado';
            if (!email) throw 'Email deve ser informado';
            if (!password) throw 'Senha deve ser informada';
            if (password !== confirmPassword) throw 'Senhas informadas não conferem';

            const existingUser = await User.exists({ email });
            if (existingUser) throw 'O usuário informado já está cadastrado';
        } catch (error) {
            return res.status(400).json({ error })
        }

        const userDB = new User({ name, email, password });
        await userDB.save();

        const token = createToken(userDB._id)
        res.json({ token })
        
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const userDB = await User.findOne({ email }).select('+password');
        if (!userDB) return res.status(400).json({ error: 'Usuário não cadastrado' })

        const isPasswordCorrect = await bcrypt.compare(password, userDB.password)
        if (!isPasswordCorrect) return res.status(401).json({ error: 'Credenciais inválidas' });

        const token = createToken(userDB._id)
        res.json({ token })

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const aboutMe = async (req: Request, res: Response) => {
    try {
        const user = req.user as UserDocument;
        const userDB = await User.findById(user._id).select('-password');
        if (!userDB) return res.status(404).json({ error: 'Usuário não encontrado' });

        res.json({ user: userDB });
    } catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

