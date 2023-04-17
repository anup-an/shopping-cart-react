import { Router } from 'express';
import passport from 'passport';

import { GenericController } from '../controllers/common';
import User, { guestUser } from '../models/user';
import { IUser } from '../schemas/user';
import { GenericService } from '../services/common';

const router = Router();
const userService = new GenericService<IUser>(User)
const userController = new GenericController<IUser>(userService);

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
    userController.getById.bind(userController),
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
    userController.update.bind(userController),
);

export default router;
