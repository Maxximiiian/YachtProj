const app = require('express').Router();
const { Like } = require('../db/models');

app.post('/liked', async (req, res) => {
  const {
    postId, userId,
  } = req.body;
  try {
    const like = await Like.create({
      postId, userId,
    });
    res.json(like);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.get('/liked', async (req, res) => {
  const likedPosts = await Like.findAll();
  res.json(likedPosts);
});

app.put('/liked', async (req, res) => {
  const {
    postId, userId,
  } = req.body;
  try {
    const removelike = await Like.findOne({ where: { postId, userId } });
    await removelike.destroy();
    return res.json({ likeId: removelike.id, postId });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

module.exports = app;
