import type express from 'express';

const checkAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.redirect('/users/login');
};

const checkNotAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  next();
};

export default {
  checkAuthenticated,
  checkNotAuthenticated,
};
