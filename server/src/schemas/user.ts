import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import ProductSchema, { IProduct } from './product';
import { createSchema } from '.';

export interface IUser extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    postcode: string;
    phone: string;
    city: string;
    country: string;
    refreshToken: string;
    wishList: IProduct[];
    cart: ICart[];
}

export interface ICart extends IProduct {
    count?: number;
}

export const CartSchema = createSchema<ICart>({
    _id: { type: mongoose.Types.ObjectId },
    id: { type: String },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    availableSizes: { type: [String] },
    count: { type: Number },
});

const UserSchema = createSchema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    postcode: { type: String },
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

export default UserSchema;
