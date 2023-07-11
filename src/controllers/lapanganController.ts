import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

const prisma = new PrismaClient();

const getLapangan = async (req: Request, res: Response): Promise<void> => {
  const lapangan = await prisma.lapangan.findMany();
  res.render('lapangan', { lapangan });
};

export default {
  getLapangan,
};
