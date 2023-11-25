import mongoose, { Document, Schema } from 'mongoose';

export interface TaskDocument extends Document {
    _user: mongoose.Types.ObjectId | string; // Referência ao ID do usuário
    title: string;
    description?: string;
    color: string;
    isFavorite: boolean;
  }

const TaskSchema = new Schema<TaskDocument>({
    _user: { type: mongoose.Schema.ObjectId, ref: "User" },
    title: { type: String, default: "Nova Tarefa" },
    description: { type: String },
    color: { type: String, default: "white" },
    isFavorite: { type: Boolean, default: false },
});

const TaskModel = mongoose.model<TaskDocument>('Task', TaskSchema);

export default TaskModel;