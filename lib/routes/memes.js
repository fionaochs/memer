const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Meme = require('../models/Meme');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    Meme
      .create({ ...req.body, author: req.user._id })
      .then(meme => res.send(meme))
      .catch(next);
  })
  .get('/popular', (req, res, next) => {
    Meme  
      .find()
      .mostComments()
      .then(Memes => res.send(Memes))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Meme
      .findById(req.params.id)
      .populate('user')
      .populate('comments')
      .then(Meme => res.send(Meme))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Meme  
      .find()
      .then(Memes => res.send(Memes))
      .catch(next);
  })
  .patch('/:id', ensureAuth, (req, res, next) => {
    Meme
      .findOneAndUpdate({
        _id: req.params.id,
        author: req.user._id
      }, req.body, { new: true })
      .then(Meme => res.send(Meme))
      .catch(next);
  })

  .delete('/:id', ensureAuth, (req, res, next) => {
    Meme
      .findOneAndDelete({
        _id: req.params.id,
        author: req.user._id
      })
      .then(Meme => res.send(Meme))
      .catch(next);
  });
