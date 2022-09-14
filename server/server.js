require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bcrypt = require('bcrypt');
const { send } = require('process');
const nodemailer = require('nodemailer');
const {
  PotentialUser, User,
} = require('./db/models');
const postsRoutes = require('./Routes/postsRoutes');
const locationRouter = require('./Routes/locationRouter');
const authRoutes = require('./Routes/authRoutes');
const photoRoutes = require('./Routes/photoRoutes');

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

// app.get('/getAllRegUsers', async (req, res) => {
//   const allUser = User.findAll();
//   res.json(allUser);
// });
app.get('/getAllRegUsers', async (req, res) => {
  try {
    const allUser = await User.findAll();
    res.json(allUser);
  } catch (error) {
    res.json(error);
  }
});
app.delete('/userDel', async (req, res) => {
  const { id } = req.body;
  User.destroy({ where: { id } });
  res.sendStatus(200);
});

app.get('/getAllPotentialUsers', async (req, res) => {
  try {
    const allPotentialUser = await PotentialUser.findAll();
    console.log(allPotentialUser);
    res.json(allPotentialUser);
  } catch (error) {
    res.json(error);
  }
});

app.get('/getAllRegUsers', async (req, res) => {
  console.log('00000000');
  try {
    const allUser = await User.findAll();
    res.json(allUser);
  } catch (error) {
    res.json(error);
  }
});

app.delete('/PotentialuserDel', async (req, res) => {
  const { id } = req.body;
  PotentialUser.destroy({ where: { id } });
  res.sendStatus(200);
});

app.post('/PotentialUserAdd', async (req, res) => {
  // console.log(req.body, 'add potential');
  const {
    name, phone, email,
  } = req.body.elem;
  // console.log(id, name, phone, email, '11111111111');
  // console.log(req.body.elem, '2222222222222222222');

  User.create({
    name, phone, email, password: await bcrypt.hash('123', 10),
  });
  const transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.PASS, // generated ethereal password
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: `${email}`,
    subject: 'Привет, это ЯхтКлуб!',
    text: 'Ваша заявка принята!',
  };
  transporter.sendMail(mailOptions, (err) => console.error(err));
  res.sendStatus(200);
});

app.use('/api/v1', postsRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', locationRouter);
app.use('/api/v1/photo', photoRoutes);

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});
