import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';

const prisma = new PrismaClient();

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
};

const register = async (req: Request, res: Response): Promise<void> => {
  await body('username').isLength({ min: 3 }).withMessage('Username minimal 3 karakter').run(req);
  await body('password')
    .isStrongPassword()
    .withMessage(
      'Password minimal 8 karakter dan harus memiliki setidaknya 1 huruf kecil, huruf besar, dan angka'
    )
    .run(req);
  await body('email').isEmail().withMessage('Email tidak valid').run(req);

  const valResult = validationResult(req);
  if (!valResult.isEmpty()) {
    const errors = valResult.array();
    req.flash(
      'error',
      errors.map((err) => err.msg)
    );
    res.redirect('/users/register');
    return;
  }

  const { username, password, displayName, email } = req.body;
  const account = await prisma.account.findUnique({
    where: { username },
  });

  if (account) {
    req.flash('error', 'Username already exists');
    res.redirect('/users/register');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.account.create({
      data: {
        username,
        password: hashedPassword,
        displayName,
        email,
      },
    });
    req.flash('success', 'Account created successfully');
    res.redirect('/users/login');
  } catch (err) {
    req.flash('error', 'Account creation failed');
    res.redirect('/users/register');
  }
};

const getLogin = (req: Request, res: Response): void => {
  res.render('login', { flash: req.flash() });
};

const getRegister = (req: Request, res: Response): void => {
  res.render('register', { flash: req.flash() });
};

const logout = (req: Request, res: Response, next: NextFunction): void => {
  req.logOut((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/users/login');
  });
};

export default {
  login,
  register,
  getLogin,
  getRegister,
  logout,
};
