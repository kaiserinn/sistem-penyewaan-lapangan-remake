import express from 'express';
import lapanganController from '../controllers/lapanganController';

const router = express.Router();

router.get('/', lapanganController.getLapangan);

router.get('/add', (req, res) => {
  res.render('add-lapangan');
});

export default router;
