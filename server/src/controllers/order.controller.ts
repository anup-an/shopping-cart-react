import { Request, Response } from 'express';
import { Order } from '../models/order';
import mongoose from 'mongoose';

interface IOrder {
    _id: mongoose.Types.ObjectId;
    user_id: string;
    name: string;
    email: string;
    address: string;
    postcode: string;
    city: string;
    country: string;
}


export const createOrderForUser = async (req: Request, res: Response) => {
    try{
        const { order } = req.body;
        await new Order({ order }).save();
        return res.status(200).json({status: "success", data: "Order created successfully"})
    }catch(error){
        console.log(error);
    }
    
}

export const getOrdersByUserId = async (req: Request, res: Response) => {
    try{
        const { _id } = req.params;
    }catch(error){
        console.log(error);
    }
    
}