import { Router } from 'express';
import verifyUser from '../middlewares/authenticate';
import { createOrderForUser, getOrdersByUserId } from '../controllers/order.controller';

const router = Router();

router.post('/', verifyUser, createOrderForUser);
router.get('/:id/get-orders', verifyUser, getOrdersByUserId);

export default router;
