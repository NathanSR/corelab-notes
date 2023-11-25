import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, select: false },
});

// Pré-processamento: hashear a senha antes de salvar no banco de dados
UserSchema.pre<UserDocument>(['save'], async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (error: any) {
        return next(error);
    }
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;