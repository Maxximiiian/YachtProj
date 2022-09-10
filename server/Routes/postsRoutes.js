const router = require('express').Router();
const { Post } = require('../db/models');

router.route('/posts')
  .get(async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
  });

router.route('/posts')
  .post(async (req, res) => {
    console.log(req.body);
    try {
      console.log('aaaaaa======');
      const post = await Post.create({ ...req.body, userId: 1, locationId: 1 });
      return res.json(post);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

module.exports = router;
