import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import User from '../models/user';
import { IUser } from '../schemas/user';

type VerifiedUser = IUser & Express.User;

const generateToken = (user: VerifiedUser) => {
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
            return res.status(400).json({ status: 'error', data: 'Email already in use' });
        }
        await new User({ email, password, firstName, lastName }).save();
        return res.status(200).json({ status: 'success', data: 'Signup successful!' });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = req.user as VerifiedUser | undefined;
        if (user) {
            const token = generateToken(user);
            if (token) {
                await User.updateOne({ email: user.email }, { $set: { refreshToken: token.refreshToken } });
                res.cookie('token', token, {
                    secure: true,
                    httpOnly: true,
                    sameSite: 'none',
                    maxAge: 864000,
                });
                return res.status(200).json({ status: 'success', data: _.omit(user, ['password', 'refreshToken']) });
            }
            return res.status(500).send('Unable to generate tokens');
        }
        return res.status(401).json({ status: 'error', data: 'User not found.' });
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    try {
        const { token } = req.cookies;
        await User.updateOne({ refreshToken: token.refreshToken }, { $set: { refreshToken: '' } });
        res.clearCookie('token');
        return res.status(200).json({ status: 'success', data: 'Successfully logged out!' });
    } catch (error) {
        return res.status(500).send(error);
    }
};

export const reIssueTokens = async (req: Request, res: Response) => {
    try {
        const user = req.user as VerifiedUser | undefined;
        if (user) {
            const tokens = generateToken(user);
            if (tokens) {
                await User.updateOne(
                    { refreshToken: user.refreshToken },
                    { $set: { refreshToken: tokens.refreshToken || '' } },
                );
                return res
                    .cookie('token', tokens, { secure: true, httpOnly: true, sameSite: 'none', maxAge: 864000 })
                    .send();
            } else {
                return res.status(500).json({ status: 'error', data: 'Unable to generate tokens.' });
            }
        } else {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};
