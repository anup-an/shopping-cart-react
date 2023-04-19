import { Router } from 'express';
import passport from 'passport';

import { GenericController } from '../controllers/common';
import Order from '../models/order';
import { IOrder } from '../schemas/order';
import { IUser } from '../schemas/user';
import { GenericService } from '../services/common';

const router = Router();
const orderService = new GenericService<IOrder>(Order);
const orderController = new GenericController<IOrder>(orderService);

router.post(
    '/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err: any, user: IUser | undefined) => {
            if (user) {
                req.body.user_id = user._id.toString();
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
        passport.authenticate('jwt', { session: false }, (err: any, user: IUser | undefined) => {
            if (user) {
                req.query.user_id = user._id.toString();
                next();
            } else {
                res.status(401).send('Unauthorized');
            }
        })(req, res, next);
    },
    orderController.getAll.bind(orderController),
);

export default router;
