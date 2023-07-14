import { Strategy as LocalStrategy } from 'passport-local';
import { type PassportStatic } from 'passport';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default (passport: PassportStatic): any => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const account = await prisma.account.findUnique({
        where: { username },
      });

      if (!account) {
        done(null, false, { message: 'Username not found!' });
        return;
      }

      const match = await bcrypt.compare(password, account.password);
      if (match) {
        done(null, account);
      } else {
        done(null, false, { message: 'Wrong password' });
      }
    })
  );

  passport.serializeUser((account: any, done) => {
    done(null, account.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    const account = await prisma.account.findUnique({
      where: { id },
    });
    if (account) done(null, account);
  });
};
