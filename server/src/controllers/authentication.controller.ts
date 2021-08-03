/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/user';

interface IUser {
    _id: string;
    email: string;
    password: string;
    refreshToken: string;
}

const generateToken = (user: IUser) => {
    return {
        accessToken: jwt.sign({ email: user.email }, 'Some_default_random_secret_token_here', {
            expiresIn: 120,
        }),
        refreshToken: jwt.sign({ email: user.email }, 'Some_default_random_secret_token_here', {
            expiresIn: 86400,
        }),
    };
};

export const signupUser = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
        return res.status(500).json({ status: 'error', data: 'Email already in use' });
    }
    await new User({ email, password, firstName, lastName }).save();
    res.status(200).json({ status: 'success', data: 'Signup successful!' });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const ret = await User.findOne({ email })
        .then(async (user: IUser) => {
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = generateToken(user);
                    await User.updateOne({ email: user.email }, { $set: { refreshToken: token.refreshToken } });
                    return res
                        .cookie('token', token, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'none',
                        })
                        .status(200)
                        .json({ status: 'success', data: user });
                }

                return res.status(401).json({
                    status: 'error',
                    data: 'Incorrect password!',
                });
            }
            return res.status(401).json({ status: 'error', data: 'User not found. Please enter correct email.' });
        })
        .catch((err: Error) => res.status(500).json({ status: 'error', data: err.message }));
    return ret;
};

export const logoutUser = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    await User.updateOne({ refreshToken: token.refreshToken }, { $set: { refreshToken: '' } });
    res.clearCookie('accessToken');
    return res.status(200).json({ status: 'success', data: 'Successfully logged out!' });
};

export const reIssueTokens = async (req: Request, res: Response) => {
    const { user } = req;
    console.log(user);
    const refToken: string = await User.findOne(user).refreshToken;
    res.send(`Reissue token ${refToken}`);
    /* try {
        jwt.verify(refToken, 'Some_default_random_secret_token_here');
        const newToken: string = jwt.sign(req.user, 'Some_default_random_secret_token_here', { expiresIn: 120 });
        res.cookie('accessToken', newToken, { secure: true, httpOnly: true }).send();
    } catch (error) {
        return res.status(401).send();
    } */
};
