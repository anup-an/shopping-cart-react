import { Router } from 'express';
import passport from 'passport';

import { createOrderForUser, getOrdersByUserId } from '../controllers/order.controller';

const router = Router();

router.post('/', passport.authenticate('jwt', { session: false }), createOrderForUser);
router.get('/:id/get-orders', passport.authenticate('jwt', { session: false }), getOrdersByUserId);

export default router;
