import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false });
    next();
};

export default verifyUser;
