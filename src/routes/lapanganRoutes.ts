import express from 'express';
import lapanganController from '../controllers/lapanganController';
import auth from '../middlewares/auth';

const router = express.Router();

router.get('/', auth.checkAuthenticated, lapanganController.getLapangan);

router.get('/add', auth.checkAuthenticated, (req, res) => {
  res.render('add-lapangan');
});

export default router;
