import { Router } from 'express';
import { signupUser, loginUser, logoutUser } from '../controllers/authentication.controller';
import { verifyUser, reIssueTokens } from '../middlewares/authenticate';

const router = Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', verifyUser, logoutUser);
router.get('/refresh-token', reIssueTokens);

export default router;
