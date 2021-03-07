/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import { uuid } from 'uuidv4';

export const Product = mongoose.model(
    'products',
    new mongoose.Schema({
        _id: { type: String, default: uuid },
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSizes: [String],
    }),
);
