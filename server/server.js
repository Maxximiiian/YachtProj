require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const {
  PotentialUser,
} = require('./db/models');
const { send } = require('process');

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

app.get('/auth', async (req, res) => {
  setTimeout(async () => {
    try {
      const result = await User.findByPk(req.session.userId);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  }, 1000);
});

app.post('/potentionalRegistration', async (req, res) => {
  const { email, name, phone, about } = req.body;
  try {
      const potentionalUser = await PotentialUser.create({ email, name, phone, about });
    if (potentionalUser){
      res.sendStatus(200)}
      else{    res.status(400).json({ message: 'That name already exists' });
    }
    }
   catch (err) {
    console.error(err);
  }
});

app.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const compare = await bcrypt.compare(password, user.password);
      if (compare) {
        req.session.userName = user.name;
        req.session.userId = user.id;
        return res.json(user);
      }
    } else {
      res.status(400).json({ message: 'something went wrong' });
    }
  } catch (error) {
    return res.json(error);
  }
});

app.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('mega-cookie');
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
