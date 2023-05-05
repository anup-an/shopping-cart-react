import { Router } from 'express';
import passport from 'passport';

import { GenericController } from '../controllers/common';
import User, { guestUser } from '../models/user';
import { IUser } from '../schemas/user';
import { GenericService } from '../services/common';
import { ErrorCode, ErrorException } from '../utils';

const router = Router();
const userService = new GenericService<IUser>(User);
const userController = new GenericController<IUser>(userService);

router.get(
    '/',
    (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err: any, user: IUser | undefined) => {
            if (user) {
                (req.params as {[key: string]: any}).id = user._id.toString();
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
        passport.authenticate('jwt', { session: false }, (err: any, user: IUser | undefined) => {
            if (user) {
                (req.params as {[key: string]: any}).id = user._id.toString();
                next();
            } else {
                throw new ErrorException(ErrorCode.AuthenticationError, 'Not authorized to perform the update.')
            }
        })(req, res, next);
    },
    userController.update.bind(userController),
);

export default router;
