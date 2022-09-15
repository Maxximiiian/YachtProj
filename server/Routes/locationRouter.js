const router = require('express').Router();
const {
  Location, Post, User, Like, LocationPhoto,
} = require('../db/models');

router.route('/locations')
  .get(async (req, res) => {
    const locations = await Location.findAll();
    res.json(locations);
  })
  .post(async (req, res) => {
    const { coords, name, userId } = req.body;
    try {
      const newLocation = await Location.create({
        coordX: coords[0], coordY: coords[1], name, userId,
      });
      if (newLocation) {
        return res.json(newLocation);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  });

router.route('/locationposts')
  .post(async (req, res) => {
    const { pickedBaloon } = req.body;
    const coords = pickedBaloon.split(',');
    const pickedLocation = await Location.findOne({
      where: {
        coordX: coords[0],
        coordY: coords[1],
      },
    });
    const currLocationPosts = await Post.findAll({
      where: { locationId: pickedLocation.id },
      order: [
        ['updatedAt', 'DESC'],
      ],
      include: [User, Like, LocationPhoto],
    });

    res.json(currLocationPosts);
  });
module.exports = router;

// router.post('/posts', multer.single('photoLocation'), async (req, res) => {
//   console.log('req SESSION', req.session.userId);
//   const { coords } = req.body;
//   const { userId } = req.session;
//   console.log(req.body, 'req BODY');
//   console.log(req.file, 'req FILE');
//   try {
//     const matchCoords = coords.split(',');
//     const pickedLocation = await Location.findOne({
//       where: {
//         coordX: matchCoords[0],
//         coordY: matchCoords[1],
//       },
//     });
//     const post = await Post.create({ ...req.body, userId, locationId: pickedLocation.id });
//     const locationPhoto = await LocationPhoto.create({
//       image: req.file.filename,
//       postId: post.id,
//     });
//     const newPost = await Post.findOne({
//       where: { id: post.id },
//       include: [User, Like, LocationPhoto],
//     });
//     console.log('yyYYYYYYYYYYYYYY', newPost);
//     // const newPhoto = await LocationPhoto.findAll({ where: { locationId: pickedLocation.id } });
//     return res.json(newPost);
//   } catch (error) {
//     console.log(error);
//     return res.sendStatus(500);
//   }
// });

// app.post('/getPhotoLocation', async (req, res) => {
//   const { id } = req.body;
//   console.log('=============>>>>>', req.body);

//   try {
//     const result = await LocationPhoto.findAll({ where: { userId: id } });
//     console.log('result', result);
//     res.json(result);
//   } catch (error) {
//     res.json(error);
//   }
// });
