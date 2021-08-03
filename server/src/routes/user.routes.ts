import { Router } from 'express';
import verifyUser from '../middlewares/authenticate';
import { editUserById, getUserById, getUserByToken } from '../controllers/user.controller';

const router = Router();
router.post('/:id', verifyUser, editUserById);
router.get('/:id', verifyUser, getUserById);
router.get('/token', getUserByToken);

export default router;
