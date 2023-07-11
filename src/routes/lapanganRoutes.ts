import express from 'express';
import lapanganController from '../controllers/lapanganController';

const router = express.Router();

router.get('/lapangan', lapanganController.getLapangan);

router.get('/lapangan/add', (req, res) => {
  res.render('add-lapangan');
});

export default router;
