import { Router } from 'express';
import verifyUser from '../middlewares/authenticate';
import { editUserById, getUserById, getUserByToken, addToUserCart } from '../controllers/user.controller';

const router = Router();
router.get('/', getUserByToken);
router.post('/:id/update-cart', verifyUser, addToUserCart);
router.post('/:id', verifyUser, editUserById);
router.get('/:id/get-orders', verifyUser, getUserById);

export default router;
