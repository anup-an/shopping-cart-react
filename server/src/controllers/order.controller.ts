/* eslint-disable consistent-return */
/* eslint-disable camelcase */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Order } from '../models/order';
import { ICart } from '../models/user';

interface IOrder {
    _id: mongoose.Types.ObjectId;
    name: string;
    user_id: mongoose.Types.ObjectId;
    email: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
    cart: ICart;
}

export const createOrderForUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, user_id, email, address, postcode, city, country, cart } = req.body.order;
        await new Order({ name, user_id, email, address, postcode, city, country, cart }).save();
        return res.status(200).json({ status: 'success', data: 'Order saved successfully' });
    } catch (error) {
        return res.send('Error');
        console.log(error);
    }
};

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try {
        const { _id } = req.params;
        console.log(_id);
        res.send('Orders sent');
    } catch (error) {
        console.log(error);
    }
};
