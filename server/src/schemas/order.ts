import mongoose from 'mongoose';
import { CartSchema, ICart } from './user';
import { createSchema } from '.';

export interface IOrder extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    user_id: string;
    email: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    cart: ICart[];
}

const OrderSchema = createSchema<IOrder>({
    name: String,
    user_id: String,
    email: String,
    address: String,
    postcode: Number,
    city: String,
    country: String,
    cart: { type: [CartSchema] },
});

export default OrderSchema;
