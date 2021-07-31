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
    const { accessToken } = req.cookies;
    let payload;
    if (!accessToken) {
        return res.status(403).send();
    }
    try {
        payload = jwt.verify(accessToken, 'Some_default_random_secret_token_here');
        console.log(payload);
        const user = User.findOne({ payload });
        req.user = user;
        console.log(req);
        next();
    } catch (error) {
        return res.status(401).send();
    }
};

export default verifyUser;
