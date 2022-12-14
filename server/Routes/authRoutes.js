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
    // console.log('lllllll', req.body);
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
app.post('/auth/changeUser', async (req, res) => {
  const { name, phone, email } = req.body;
  console.log(req.session);
  const { userId } = req.session;
  console.log('========>>>>>>> prihod user change', userId, name, phone, email);
  // console.log(req.body);
  // console.log('!!!!!!!!!!!!!', name, isDone);
  // const { userId } = req.session;

  await User.update(
    { name, phone, email },
    { where: { id: userId } },
  );
  const result1 = await User.findByPk(req.session.userId);
  console.log(result1);
  res.json(result1);
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
  const user = await User.findByPk(req.session?.userId);
  if (user) {
    return res.json(user);
  }
  res.status(204).json({});
});

module.exports = app;
