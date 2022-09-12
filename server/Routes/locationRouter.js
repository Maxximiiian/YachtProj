const router = require('express').Router();
const { Location } = require('../db/models');

router.route('/locations')
  .get(async (req, res) => {
    const locations = await Location.findAll();
    res.json(locations);
  })
  .post(async (req, res) => {
    console.log(req.body);
    console.log(req.sessions);
    try {
    //   const post = await Location.create({ ...req.body, userId: 1, locationId: 1 });
    //   return res.json(post);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

module.exports = router;
