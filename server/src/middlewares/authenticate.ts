import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import UserSchema from '../schemas/user';

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        const secretKey = process.env.JWT_SECRET || '';
        if (token && token.refreshToken) {
            jwt.verify(token.refreshToken, secretKey);
            next();
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const verifyLoginCredentials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select(Object.keys(UserSchema.obj));
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                req.user = user.toObject();
                next();
                return;
            } else {
                return res.status(401).json({ status: 'error', data: 'Incorrect password' });
            }
        }
        return res.status(401).json({ status: 'error', data: 'User not found. Please enter correct email.' });
    } catch (error) {
        return res.status(500).send(error);
    }
};
