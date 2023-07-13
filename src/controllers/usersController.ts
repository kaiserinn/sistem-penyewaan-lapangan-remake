import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureMessage: true,
  })(req, res, next);
};

const register = async (req: Request, res: Response): Promise<void> => {
  const { username, password, displayName, email } = req.body;
  const account = await prisma.account.findUnique({
    where: { username },
  });

  if (account) throw new Error('Username already exists');
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAccount = await prisma.account.create({
    data: {
      username,
      password: hashedPassword,
      displayName,
      email,
    },
  });
  if (newAccount) {
    console.log('Account created successfully');
    res.redirect('login');
  } else {
    throw new Error('Account creation failed');
  }
};

export default {
  login,
  register,
};
