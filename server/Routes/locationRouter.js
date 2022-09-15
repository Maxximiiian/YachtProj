const router = require('express').Router();
const {
  Location, Post, User, Like,
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
    res.json(currLocationPosts);
  });
module.exports = router;
