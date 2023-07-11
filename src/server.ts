import express from 'express';
import { PrismaClient } from '@prisma/client';
import lapanganRoutes from './routes/lapanganRoutes';

const prisma = new PrismaClient();
const app = express();

console.log('object');

app.set('view engine', 'ejs');

const port = process.env.PORT ?? '3000';
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  const account = await prisma.account.findFirst({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  if (account !== null && account !== undefined) {
    res.redirect('/');
  } else {
    console.log('Wrong username or password');
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.use(lapanganRoutes);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});
