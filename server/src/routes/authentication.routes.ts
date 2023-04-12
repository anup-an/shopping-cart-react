import { Router } from 'express';
import passport from 'passport';
import { signupUser, loginUser, logoutUser, reIssueTokens } from '../controllers/authentication.controller';
import { verifyLoginCredentials, verifyRefreshToken } from '../middlewares/authenticate';

const router = Router();

router.post('/signup', signupUser);
router.post('/login', verifyLoginCredentials, loginUser);
router.post('/logout', passport.authenticate('jwt', { session: false }), logoutUser);
router.get('/reissue-token', passport.authenticate('jwt', { session: false }), verifyRefreshToken, reIssueTokens);

export default router;
