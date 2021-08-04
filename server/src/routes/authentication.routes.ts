import { Router } from 'express';
import { signupUser, loginUser, logoutUser, reIssueTokens } from '../controllers/authentication.controller';
import verifyUser from '../middlewares/authenticate';

const router = Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', verifyUser, logoutUser);
router.get('/reissue-token', reIssueTokens);

export default router;
