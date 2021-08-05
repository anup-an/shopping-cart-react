/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends mongoose.Document {
    _id: string;
    email: string;
    password: string;
    refreshToken: string;
    wishList: IProduct[];
    cart: ICart[];
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}
export interface ICart {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    count?: number;
}

const CartSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    availableSizes: { type: [String] },
    count: { type: Number },
});

const ProductSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    availableSizes: { type: [String] },
});

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    refreshToken: { type: String },
    wishList: { type: [ProductSchema] },
    cart: { type: [CartSchema] },
});

UserSchema.pre<IUser>('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model<IUser>('users', UserSchema);

export default User;
