/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { ICart } from '../schemas/user';

interface IOrder extends mongoose.Document {
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

export const createOrderForUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, user_id, email, address, postcode, city, country, cart } = req.body.order;
        await new Order({ name, user_id, email, address, postcode, city, country, cart }).save();
        return res.status(200).json({ status: 'success', data: 'Order saved successfully' });
    } catch (error) {
        return res.send('Error');
    }
};

export const getOrdersByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
        const orders = await Order.find({});
        const user_orders = orders.filter((order) => order.user_id === req.params.id);
        return res.status(200).json({ status: 'orders retrieved successfully', data: user_orders });
    } catch (error) {
        return res.send('Error getting user orders');
    }
};
