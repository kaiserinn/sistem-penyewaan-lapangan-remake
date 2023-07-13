import express from 'express';
import usersController from '../controllers/usersController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/login', auth.checkNotAuthenticated, (req, res) => {
  res.render('login');
});

router.post('/login', auth.checkNotAuthenticated, usersController.login);

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', usersController.register);

export default router;
