/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface JWTData {
    email: string;
}

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    let payload;
    if (!token) {
        return res.status(403).send();
    }
    try {
        payload = jwt.verify(token.accessToken, 'Some_default_random_secret_token_here');
        const user = User.findOne({ payload });
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send();
    }
};

export default verifyUser;
