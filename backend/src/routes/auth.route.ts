import express from 'express';
import { registerUser, loginUser, aboutMe } from '../controllers/auth';
import passport from 'passport';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/me', passport.authenticate('jwt', { session: false }), aboutMe);

export default router;