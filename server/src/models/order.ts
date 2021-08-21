/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import { CartSchema } from './user';
import { uuid } from 'uuidv4';

export const Order = mongoose.model(
    'orders',
    new mongoose.Schema({
        _id: { type: String, default: uuid },
        name: String,
        user_id: String,
        email: String,
        phone: String,
        address: String,
        postcode: Number,
        city: String,
        country: String,
        cart: { type: [CartSchema] }, 
    }),
);
