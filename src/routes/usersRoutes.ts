import express from 'express';
import usersController from '../controllers/usersController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/login', auth.checkNotAuthenticated, usersController.getLogin);
router.post('/login', usersController.login);
router.get('/register', auth.checkNotAuthenticated, usersController.getRegister);
router.post('/register', usersController.register);
router.post('/logout', usersController.logout);

export default router;
