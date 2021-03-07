/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import User from '../models/user';

interface IUser {
    _id: string;
    email: string;
    password: string;
}

function generateToken(user: IUser) {
    return jwt.sign({ email: user.email }, 'Some_default_random_secret_token_here', {
        expiresIn: 86400 * 7,
    });
}

export const signupUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(500).json({ status: 'error', data: 'Email already in use' });
    }
    await new User({ email, password }).save();
    res.status(200).json({ status: 'success', data: 'Signup successful!' });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const ret = await User.findOne({ email, password })
        .then(async (user: IUser) => {
            if (user) {
                return res.status(200).json(generateToken(user));
            }
            return res.status(401).json({ status: 'error', data: 'Email or password is incorrect' });
        })
        .catch((err: Error) => res.status(500).json({ status: 'error', data: err.message }));
    return ret;
};

export const logoutUser = async (req: Request, res: Response) => {
    req.logout();
    return res.status(200).json({ status: 'error', data: 'Successfully logged out!' });
};
