import express, { Express, Request, Response } from 'express';
const app: Express = express();

import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()

import './configs/mongoose';
import passportConfig from './configs/passport';
passportConfig(app)

import authRoutes from './routes/auth.route';
import taskRoutes from './routes/task.route';

//Configurações básicas de segurança e comunicação
app.use(bodyParser.json()); // Configuração do body-parser para analisar solicitações JSON
app.use(bodyParser.urlencoded({ extended: true })); // Configuração do body-parser para analisar solicitações URL-encoded
app.use(helmet()); // Configuração do helmet para segurança HTTP
app.use(cors())

//Rotas
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => console.log(`⚡️[server]: servidor está rodando em http://localhost:${PORT}`));