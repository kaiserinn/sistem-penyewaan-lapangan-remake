import type { Request, Response, NextFunction } from 'express';

const checkAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/users/login');
};

const checkNotAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect('/');
};

export default { checkAuthenticated, checkNotAuthenticated };
