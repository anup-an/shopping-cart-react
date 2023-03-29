import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (token) {
            jwt.verify(token.accessToken, 'Some_default_random_secret_token_here');
            next();
        } else {
            return res.status(403).send('No token');
        }

        /* const user = User.findOne({ payload });
        req.user = user; */
    } catch (error) {
        return res.status(401).send();
    }
};

export default verifyUser;
