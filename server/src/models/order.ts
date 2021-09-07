/* eslint-disable camelcase */
import mongoose from 'mongoose';
import { CartSchema, ICart } from './user';

export interface IOrder extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    user_id: mongoose.Types.ObjectId;
    email: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    cart: ICart[];
}

export const Order = mongoose.model<IOrder>(
    'orders',
    new mongoose.Schema({
        name: String,
        user_id: String,
        email: String,
        address: String,
        postcode: Number,
        city: String,
        country: String,
        cart: { type: [CartSchema] },
    }),
);
