/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

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

export interface IProduct {
    _id: string;
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

export const CartSchema = new mongoose.Schema({
    id: { type: String },
    title: { type: String },
    image: { type: String },
    description: { type: String },
    price: { type: Number },
    availableSizes: { type: [String] },
    count: { type: Number },
});

const UserSchema = new mongoose.Schema({
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
    cart: { type: [CartSchema] },
});

UserSchema.pre<IUser>('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model<IUser>('users', UserSchema);

export default User;
