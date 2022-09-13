const app = require('express').Router();
// const multer = require('multer');
const { UserPhoto } = require('../db/models');
const multer = require('../middlewares/multer');

// const upload = multer({ dest: 'uploads/' });

app.post('/userphoto', async (req, res) => {
  const { id } = req.body;
  console.log('=============>>>>>', req.body);

  try {
    const result = await UserPhoto.findAll({ where: { userId: id } });
    console.log('result', result);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
app.post(
  '/changePhoto',
  multer.single('avatar'),
  // upload.single('avatar'),
  async (req, res) => {
    try {
      console.log('!!!!!!!!!!!!!!!', req.file);
      const { userId } = req.session;
      console.log('========>>>>>>> prihod PHOTO change', userId);
      const photo = await UserPhoto.findOne({ where: { userId } });
      if (photo) {
        await UserPhoto.update(
          { image: req.file.filename },
          { where: { userId } },
        );
        const photoChange = await UserPhoto.findOne({ where: { userId } });
        console.log(photoChange);
        res.json(photoChange);
      } else {
        const photoCreate = await UserPhoto.create({ userId, image: req.file.filename });
        res.json(photoCreate);
      }
    } catch (error) {
      return res.json(error);
    }
  },
);

module.exports = app;
