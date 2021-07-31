import { Router } from 'express';
import verifyUser from '../middlewares/authenticate';
import { editUserData, getUserData } from '../controllers/user.controller';

const router = Router();
router.post('/:id', verifyUser, editUserData);
router.get('/:id', verifyUser, getUserData);

export default router;
