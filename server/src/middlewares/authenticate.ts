import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import UserSchema from '../schemas/user';
import { VerifiedUser } from '../controllers/authentication.controller';
import { ErrorCode, ErrorException } from '../utils';

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        const secretKey = process.env.JWT_SECRET || '';
        if (token && token.refreshToken) {
            jwt.verify(token.refreshToken, secretKey);
            next();
        } else {
            throw new ErrorException(ErrorCode.AuthenticationError, 'Unauthorized');
        }
    } catch (error) {
        next(error);
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
                throw new ErrorException(ErrorCode.AuthenticationError, 'Incorrect password.');
            }
        }
        throw new ErrorException(ErrorCode.AuthenticationError, 'User not found. Please enter correct email.');
    } catch (error) {
        next(error);
    }
};

export const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user as VerifiedUser | undefined;
        if (user) {
            if (user.role === 'admin') {
                next();
                return;
            } else {
                throw new ErrorException(ErrorCode.ForbiddenError, 'Permission denied');
            }
        }
    } catch (error) {
        next(error);
    }
};
