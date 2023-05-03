import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

import Token from '../models/token';
import User from '../models/user';
import { IUser } from '../schemas/user';
import { ErrorCode, ErrorException } from '../utils';
import sendEmail from '../utils/sendEmail';

export type VerifiedUser = IUser & Express.User;

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

export const signupUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            throw new ErrorException(ErrorCode.ForbiddenError, 'Email already in use')
        }
        await new User({ email, password, firstName, lastName }).save();
        return res.status(200).send('Signup successful');
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
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
                return res.status(200).json({ data: _.omit(user, ['password', 'refreshToken', '__v']) });
            }
            throw new ErrorException(ErrorCode.AuthenticationError, 'Unauthorized');
        }
        throw new ErrorException(ErrorCode.NotFoundError, 'User not found');
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        await User.updateOne({ refreshToken: token.refreshToken }, { $set: { refreshToken: '' } });
        res.clearCookie('token');
        return res.status(200).json({ status: 'success', data: 'Successfully logged out!' });
    } catch (error) {
        next(error);
    }
};

export const reIssueTokens = async (req: Request, res: Response, next: NextFunction) => {
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
                throw new ErrorException(ErrorCode.ServerError, 'Unable to generate tokens');
            }
        } else {
            throw new ErrorException(ErrorCode.AuthenticationError, 'Unauthorized');
        }
    } catch (error) {
        next(error);
    }
};

export const sendPasswordResetLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw new ErrorException(ErrorCode.ResetPasswordError, 'User does not exist');

        const token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();
        const resetToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = await bcrypt.hash(resetToken, 10);

        await new Token({
            userId: user._id,
            token: tokenHash,
            createdAt: Date.now(),
        }).save();

        await sendEmail(
            email,
            'Reset your password',
            `You have asked to reset your password. Open then link, ${
                process.env.HOST || 'http://localhost:3000'
            }/reset-password?token=${tokenHash} and follow the instructions. The link can be used only once`,
        );
        res.status(200).send('Password reset link sent');
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, resetToken } = req.body;
        const result = await Token.findOne({ token: resetToken });
        if (!result) throw new ErrorException(ErrorCode.ResetPasswordError, 'Invalid or expired password reset token');

        const user = await User.findOneAndUpdate(
            { _id: result.toObject().userId },
            { password: await bcrypt.hash(password, 10) },
            {new: true},
        );
        if (!user) throw new ErrorException(ErrorCode.ResetPasswordError, 'User not found');

        await Token.findOneAndDelete({ userId: user._id });
        res.status(200).send('Password reset successful');
    } catch (error) {
        next(error);
    }
};
