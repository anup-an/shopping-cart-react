import { Router } from 'express';
import passport from 'passport';

import { IUser } from '../schemas/user';
import { getById, updateById } from '../controllers/common';
import User, { guestUser } from '../models/user';

const router = Router();
router.get(
    '/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                req.params.id = (user as IUser)?._id.toString();
                next();
            } else {
                res.status(200).json({ data: guestUser });
            }
        })(req, res, next);
    },
    getById<IUser>(User),
);
router.post(
    '/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                req.params.id = (user as IUser)?._id.toString();
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        })(req, res, next);
    },
    updateById<IUser>(User),
);

export default router;
