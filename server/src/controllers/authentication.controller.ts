import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import CreateModel from '../models/model';
import UserSchema from '../schemas/user';

interface IUser {
    _id: mongoose.Types.ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    address: string;
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
    count?: number;
}

const User = new CreateModel<IUser>('users', UserSchema).create();

const generateToken = (user: IUser) => {
    const secretKey = process.env.JWT_SECRET;
    if (secretKey) {
        return {
            accessToken: jwt.sign({ email: user.email }, secretKey, {
                expiresIn: 60000,
            }),
            refreshToken: jwt.sign({ email: user.email }, secretKey, {
                expiresIn: 864000,
            }),
        };
    }
};

export const signupUser = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(500).json({ status: 'error', data: 'Email already in use' });
        }
        await new User({ email, password, firstName, lastName }).save();
        res.status(200).json({ status: 'success', data: 'Signup successful!' });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = generateToken(user);
                if (token) {
                    await User.updateOne({ email: user.email }, { $set: { refreshToken: token.refreshToken } });
                    return res
                        .cookie('token', token, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'none',
                            maxAge: 864000,
                        })
                        .status(200)
                        .json({ status: 'success', data: user });
                }
                res.status(500).send('Unable to generate tokens');
            }

            return res.status(401).json({
                status: 'error',
                data: 'Incorrect password!',
            });
        }
        return res.status(401).json({ status: 'error', data: 'User not found. Please enter correct email.' });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies;
        await User.updateOne({ refreshToken: token.refreshToken }, { $set: { refreshToken: '' } });
        res.clearCookie('token');
        return res.status(200).json({ status: 'success', data: 'Successfully logged out!' });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
};

export const reIssueTokens = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies;
        const secretKey = process.env.JWT_SECRET;
        secretKey && token
            ? jwt.verify(token.refreshToken, secretKey)
            : res.status(500).send('Missing token or secret key');
        const user = await User.findOne({ refreshToken: token.refreshToken });
        if (user && secretKey) {
            const newToken: string = jwt.sign({ email: user.email }, secretKey, {
                expiresIn: 60000,
            });
            const newRefreshToken: string = jwt.sign({ email: user.email }, secretKey, {
                expiresIn: 86400,
            });

            const tokens = {
                accessToken: newToken,
                refreshToken: newRefreshToken,
            };
            await User.updateOne({ refreshToken: token.refreshToken }, { $set: { refreshToken: newRefreshToken } });

            res.cookie('token', tokens, { secure: true, httpOnly: true, sameSite: 'none', maxAge: 864000 }).send();
        } else {
            res.status(403).json({ status: 'error', data: 'Invalid refresh token' });
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
};
