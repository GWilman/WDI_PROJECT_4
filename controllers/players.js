const Player = require('../models/player');

function playersIndex(req, res, next) {
  Player
    .find()
    .populate('team')
    .exec()
    .then(players => res.json(players))
    .catch(next);
}

function playersShow(req, res, next) {
  Player
    .findById(req.params.id)
    .populate('team')
    .exec()
    .then((player) => {
      if(!player) return res.notFound();
      res.json(player);
    })
    .catch(next);
}

module.exports = {
  index: playersIndex,
  show: playersShow
};
