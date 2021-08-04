import { Router } from 'express';
import verifyUser from '../middlewares/authenticate';
import { editUserById, getUserById, getUserByToken, addToUserCart } from '../controllers/user.controller';

const router = Router();
router.post('/:id', verifyUser, editUserById);
router.get('/:id', verifyUser, getUserById);
router.get('/', getUserByToken);
router.post('/add-products', verifyUser, addToUserCart);

export default router;
