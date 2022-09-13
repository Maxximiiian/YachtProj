const router = require('express').Router();
const { Location } = require('../db/models');

router.route('/locations')
  .get(async (req, res) => {
    const locations = await Location.findAll();
    res.json(locations);
  })
  .post(async (req, res) => {
    const {coords, name, userId} = req.body
    try {
      const newLocation = await Location.create({coordX: coords[0], coordY: coords[1], name, userId });
      if(newLocation) {
          return res.json(newLocation);
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  });

module.exports = router;
