import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import validator from 'validator';

import { createSchema } from '.';
import ProductSchema, { IProduct } from './product';

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
    email: {
        type: String,
        required: [true, 'E-mail is required'],
        unique: true,
        validate: [validator.isEmail, 'E-mail must be in format e.g., example@example.com'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator: (str: string) => {
                return validator.isStrongPassword(str, {
                    minLength: 8,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1,
                });
            },
            message:
                'Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number and one symbol',
        },
    },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    postcode: { type: String },
    phone: { type: String },
    city: { type: String },
    country: { type: String },
    refreshToken: { type: String, select: false },
    wishList: { type: [ProductSchema] },
    cart: { type: [CartSchema] },
});

UserSchema.pre<IUser>('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default UserSchema;
