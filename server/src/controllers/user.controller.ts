/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'lodash';

import User from '../models/user';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
    postcode: string;
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
    count: number;
}

export const editUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user } = req.body;
        const newPassword = await bcrypt.hash(user.password, 10);
        User.findByIdAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { ...user, password: newPassword },
            // @ts-ignore
            (err, response) => {
                if (err) {
                    console.log(`Error updating user data ${err}`);
                    res.status(400).json({ status: 'Error', data: 'User data not updated' });
                }
                console.log(`Reponse from database ${response}`);
                res.json({ status: 'success', data: 'User data updated' });
            },
        );
    } catch (error) {
        res.send(error);
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id).exec();
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
        const guestUser = {
            _id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            city: '',
            country: '',
            refreshToken: '',
            wishList: [],
            cart: [],
        };
        const { token } = req.cookies;
        if (token) {
            const user = await User.findOne({ refreshToken: token.refreshToken });
            !_.isEmpty(user)
                ? res.status(200).json({ status: 'Logged user found.', data: user })
                : res.status(401).json({
                      status: 'Unauthorized user.',
                      data: guestUser,
                  });
        } else {
            res.status(200).json({ status: 'Guest user.', data: guestUser });
        }
    } catch (error) {
        res.send(error);
    }
};

export const addToUserCart = async (req: Request, res: Response): Promise<Response> => {
    try {
        if (mongoose.isValidObjectId(req.body.id)) {
            const user = await User.findByIdAndUpdate(
                { _id: new mongoose.Types.ObjectId(req.body.id) },
                { $set: { cart: req.body.cart } },
            );
            if (user) {
                return res.status(200).json({ updatedUser: user });
            }
            return res.send('user not found');
        }
        return res.send('Not valid objectid');
    } catch (error) {
        return res.send(error);
    }
};
