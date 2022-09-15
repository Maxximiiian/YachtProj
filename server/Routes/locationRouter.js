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
      include: [User, Like],
    });
    const currLocationPhotos = await LocationPhoto
      .findAll({ where: { locationId: pickedLocation.id } });
    console.log(currLocationPosts, currLocationPhotos);
    res.json({ currLocationPosts, currLocationPhotos });
  });
module.exports = router;

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
