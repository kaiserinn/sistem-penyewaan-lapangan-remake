import express from 'express';
import lapanganRoutes from './routes/lapanganRoutes';
import usersRoutes from './routes/usersRoutes';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import config from './config/passport';
import auth from './middlewares/auth';

config(passport);
dotenv.config();
const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET must be defined!');
}
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT ?? '3000';
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', auth.checkAuthenticated, (req, res) => {
  res.render('index');
});

app.use('/lapangan', lapanganRoutes);
app.use('/users', usersRoutes);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});
