import { Router } from 'express';
import passport from 'passport';
import { signupUser, loginUser, logoutUser } from '../controllers/authentication.controller';

const router = Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', passport.authenticate('jwt', { session: false }), logoutUser);

export default router;
