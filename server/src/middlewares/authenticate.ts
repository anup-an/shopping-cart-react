/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface JWTData {
    email: string;
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;
    let payload;
    if (!accessToken) {
        return res.status(403).send();
    }
    try {
        payload = jwt.verify(accessToken, 'Some_default_random_secret_token_here');
        next();
    } catch (error) {
        return res.status(401).send();
    }
    return payload;
};

export const reIssueTokens = (req: Request, res: Response, next: NextFunction) => {
    const payload = (verifyUser(req, res, next) as JWTData).email;

    const refToken: string = User.findOne({ payload }).refreshToken;
    try {
        jwt.verify(refToken, 'Some_default_random_secret_token_here');
        const newToken: string = jwt.sign(payload, 'Some_default_random_secret_token_here', { expiresIn: 120 });
        res.cookie('accessToken', newToken, { secure: true, httpOnly: true }).send();
    } catch (error) {
        return res.status(401).send();
    }
};
