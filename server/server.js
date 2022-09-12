require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const { send } = require('process');
const {
  PotentialUser, User,
} = require('./db/models');
const postsRoutes = require('./Routes/postsRoutes');
const authRoutes = require('./Routes/authRoutes');

const app = express();

app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

const sessionConfig = {
  name: 'mega-cookie',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};

app.use(session(sessionConfig));

app.post('/potentionalRegistration', async (req, res) => {
  const {
    email, name, phone, about,
  } = req.body;
  try {
    const potentionalUser = await PotentialUser.create({
      email, name, phone, about,
    });
    if (potentionalUser) {
      res.sendStatus(200);
    } else {
      res.status(400).json({ message: 'That name already exists' });
    }
  } catch (err) {
    console.error(err);
  }
});

app.post('/adminRegistration', async (req, res) => {
  const {
    email, name, phone, password, admin,
  } = req.body;
  console.log(req.body);

  try {
    const currUser = await User.findOne({ where: { email } });
    if (!currUser) {
      const hashPassword = await bcrypt.hash(password, 10);
      if (admin[0] === 'Администратор') {
        const newUser = await User.create({
          email, name, password: hashPassword, phone, admin: true, theme: false,
        });
        return res.json(newUser);
      }
      const newUser = await User.create({
        email, name, password: hashPassword, phone, admin: false, theme: false,
      });
      return res.json(newUser);
    }
    res.status(400).json({ message: 'That name already exists' });
  } catch (err) {
    console.error(err);
  }
});

app.use('/api/v1', postsRoutes);
app.use('/api/v1', authRoutes);

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
