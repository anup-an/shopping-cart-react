import { Router } from 'express';
import passport from 'passport';

import { GenericController } from '../controllers/common';
import Order from '../models/order';
import { IOrder } from '../schemas/order';
import { IUser } from '../schemas/user';

const router = Router();
const orderController = new GenericController<IOrder>(Order);

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
    orderController.create.bind(orderController),
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
    orderController.getAll.bind(orderController),
);

export default router;
