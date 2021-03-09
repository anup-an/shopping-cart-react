/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
}

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre<IUser>('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model<IUser>('users', UserSchema);

export default User;
