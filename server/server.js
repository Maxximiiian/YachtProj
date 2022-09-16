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
  PotentialUser, User, Location, Way,
} = require('./db/models');
const postsRoutes = require('./Routes/postsRoutes');
const locationRouter = require('./Routes/locationRouter');
const authRoutes = require('./Routes/authRoutes');
const photoRoutes = require('./Routes/photoRoutes');
const likedRoutes = require('./Routes/likedRoutes');

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
    // res.status(400).json({ message: 'That name already exists' });
  } catch (err) {
    console.error(err);
  }
});
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
    res.json(allPotentialUser);
  } catch (error) {
    res.json(error);
  }
});

app.get('/getAllRegUsers', async (req, res) => {
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
  const {
    name, phone, email,
  } = req.body.elem;

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
    subject: 'Сообщение от The Sailing Club',
    // text: `Добрый день, уважаемый ${name}! Ваша заявка на регистрацию в нашем сервисе для выпускников успешно одобрена! Для входа на сайт, пожалуйста, используйте пароль: "123", а также Ваш электронный адрес: ${email}. Приятных Вам путешействий и попутного ветра!`,
    html: ` 
            <td><img style="height: 650px" src="https://static.tildacdn.com/tild3435-6263-4262-b934-366538383033/2021-10-31_15-02-13_.jpg" /></td>
              
              <h3>Добрый день, уважаемый ${name}!</h3>
              <p class="lead">Ваша заявка на регистрацию в нашем сервисе для выпускников успешно одобрена!</p>
              
              <p>
              Для входа на сайт, пожалуйста, используйте пароль:
              </p>
              
              <h3>123</h3>
              <p>а также Ваш электронный адрес:</p>
              <h3>${email}</h3>
              <p>Приятных Вам путешействий и попутного ветра!</p>`,
  };
  transporter.sendMail(mailOptions, (err) => console.error(err));
  res.sendStatus(200);
});
app.post('/getAllUsersLocation', async (req, res) => {
  try {
    const { userId } = req.body;
    const allUserLocations = await Location.findAll({ where: { userId } });
    res.json(allUserLocations);
  } catch (error) {
    res.json(error);
  }
});

app.post('/getAllUsersTrips', async (req, res) => {
  try {
    const { userId } = req.body;
    const allUserTrips = await Way.findAll({ where: { userId } });

    res.json(allUserTrips);
  } catch (error) {
    res.json(error);
  }
});
app.delete('/userLocDel', async (req, res) => {
  const { id } = req.body;
  Location.destroy({ where: { id } });
  res.sendStatus(200);
});
app.delete('/userTripDel', async (req, res) => {
  const { id } = req.body;
  Way.destroy({ where: { id } });
  res.sendStatus(200);
});

app.use('/api/v1', postsRoutes);
app.use('/api/v2', likedRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', locationRouter);
app.use('/api/v1/photo', photoRoutes);

app.listen(process.env.PORT, () => {
  console.log('server start ', process.env.PORT);
});

// huku.ukuk@yandex.ru
