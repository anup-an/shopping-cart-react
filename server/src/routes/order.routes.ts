import { Router } from 'express';
import passport from 'passport';

import { create, getAll } from '../controllers/common';
import { IOrder } from '../schemas/order';
import Order from '../models/order';
import { IUser } from '../schemas/user';

const router = Router();

router.post(
    '/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                req.body.user_id = (user as IUser)?._id.toString();
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        })(req, res, next);
    },
    create<IOrder>(Order),
);
router.get(
    '/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (user) {
                req.query.user_id = (user as IUser)?._id.toString();
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        })(req, res, next);
    },
    getAll<IOrder>(Order),
);

export default router;
