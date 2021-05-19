import { Request, Response } from 'express';
import User from '../models/user';

export interface IUser {
    _id: string;
    email: string;
    password: string;
    refreshToken: string;
    wishList: IProduct[];
    cart: ICart[];
}

interface IProduct {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

interface ICart {
    id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    quantity: number;
}

export const editUserData = async (req: Request, res: Response): Promise<void> => {
    const user: IUser = req.body;
    User.findByIdAndUpdate(req.params.id, { user }, { upsert: true }, (err, response) => {
        if (err) {
            console.log(`Error updating user data ${err}`);
            res.status(400).json({ status: 'Error', data: 'User data not updated' });
        }
        console.log(`Reponse from database ${response}`);
        res.json({ status: 'success', data: 'User data updated' });
    });
};

export const getUserData = async (req: Request, res: Response): Promise<void> => {
    User.findById(req.params.id).then((user: IUser) => {
        res.status(200).json({ status: 'success', data: user });
    });
};
