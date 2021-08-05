/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import { Request, Response } from 'express';
import User from '../models/user';

export interface IUser {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    city: string;
    country: string;
    refreshToken: string;
    wishList: IProduct[];
    cart: ICart[];
}

interface IProduct {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
}

interface ICart {
    _id: string;
    title: string;
    image: string;
    description: string;
    price: number;
    availableSizes: string[];
    quantity: number;
}

export const editUserById = async (req: Request, res: Response): Promise<void> => {
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

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.status(200).json({ status: 'success', data: user });
        } else {
            res.send('User not found');
        }
    } catch (error) {
        res.send(error);
    }
};

export const getUserByToken = async (req: Request, res: Response): Promise<void> => {
    try {
        const { token } = req.cookies;
        const user = await User.findOne({ refreshToken: token.refreshToken });
        user
            ? res.status(200).json({ status: 'Logged user found.', data: user })
            : res.status(401).json({
                  status: 'Refresh token not found in the database. Token has expired or user has not logged in.',
                  data: {
                      _id: '',
                      email: '',
                      password: '',
                      firstName: '',
                      lastName: '',
                      phone: '',
                      city: '',
                      country: '',
                      refreshToken: '',
                      wishList: [],
                      cart: [],
                  },
              });
    } catch (error) {
        console.log(error);
    }
};

export const addToUserCart = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.body;
        const user = await User.findOne({ _id: id });
        if (user) {
            user.cart = [...req.body.cart];
            await user.save();
            console.log(req.body.cart);
            return res.status(200).send(user);
        }
        return res.status(401).send('user ids not matching');
    } catch (error) {
        return res.send(error);
    }
};
