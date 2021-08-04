import { Router } from 'express';
import verifyUser from '../middlewares/authenticate';
import { editUserById, getUserById, getUserByToken, addToUserCart } from '../controllers/user.controller';

const router = Router();
router.post('/:id', verifyUser, editUserById);
router.get('/:id', verifyUser, getUserById);
router.get('/', getUserByToken);
router.post('/:id/update-cart', verifyUser, addToUserCart);

export default router;
