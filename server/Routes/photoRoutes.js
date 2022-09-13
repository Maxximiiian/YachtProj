const app = require('express').Router();
const { UserPhoto } = require('../db/models');

app.post('/userphoto', async (req, res) => {
  const { id } = req.body;
  console.log('=============>>>>>', req.body);

  try {
    const result = await UserPhoto.findAll({ where: { id } });
    console.log('result', result);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
app.post('/changePhoto', async (req, res) => {
  try {
    const { image } = req.body;
    const { userId } = req.session;
    console.log('========>>>>>>> prihod PHOTO change', userId, image);
    const photo = await UserPhoto.findOne({ where: { userId } });
    if (photo) {
      await UserPhoto.update(
        { image },
        { where: { userId } },
      );
      const photoChange = await UserPhoto.findByPk(req.session.userId);
      console.log(photoChange);
      res.json(photoChange);
    } else {
      const photoCreate = await UserPhoto.create({ userId, image });
      res.json(photoCreate);
    }
  } catch (error) {
    return res.json(error);
  }
});

module.exports = app;
