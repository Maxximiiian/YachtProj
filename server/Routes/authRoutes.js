const app = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

app.get('/auth', async (req, res) => {
  try {
    const result = await User.findByPk(req.session.userId);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.post('/auth', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('lllllll', req.body);
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

// app.post('/potentionalRegistration', async (req, res) => {
//   const {
//     email, name, phone, about,
//   } = req.body;
//   try {
//     const potentionalUser = await PotentialUser.create({
//       email, name, phone, about,
//     });
//     if (potentionalUser) {
//       res.sendStatus(200);
//     } else {
//       res.status(400).json({ message: 'That name already exists' });
//     }
//   } catch (err) {
//     console.error(err);
//   }
// });

app.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('mega-cookie');
    res.sendStatus(200);
  } catch (error) {
    res.json(error);
  }
});

app.post('/check', async (req, res) => {
  console.log(req.session.userId);
  if (req.session.userId) {
    return res.json(req.session);
  }
  res.sendStatus(401);
});

module.exports = app;
