import { uuid } from 'uuidv4';
import mongoose from 'mongoose';
import { createSchema } from '.';

export interface IProduct extends mongoose.Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

const ProductSchema = createSchema<IProduct>({
    _id: { type: mongoose.Types.ObjectId, default: uuid },
    title: { type: String, index: true },
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
});

export default ProductSchema;
