const router = require('express').Router();
const { Post, User, Like } = require('../db/models');

router.route('/posts')
  .get(async (req, res) => {
    const posts = await Post.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
      include: [User, Like],
    });
    res.json(posts);
  });

router.route('/posts')
  .post(async (req, res) => {
    console.log(req.body, '====123');
    try {
      console.log('aaaaaa======');
      const post = await Post.create({ ...req.body, userId: 1, locationId: 1 });
      const newPost = await Post.findOne({ where: { id: post.id }, include: [User, Like] });
      return res.json(newPost);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.route('/posts/:postId')
  .delete(async (req, res) => {
    const { postId } = req.params;
    try {
      const removePost = await Post.findOne({ where: { id: +postId } });
      if (req.session.userId === removePost.userId) {
        await removePost.destroy();
        return res.json(removePost);
      }
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  });

module.exports = router;
