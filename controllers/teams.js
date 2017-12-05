const Team = require('../models/team');
const Player = require('../models/player');

function teamsIndex(req, res, next) {
  Team
    .find()
    .populate('players')
    .exec()
    .then(teams => res.json(teams))
    .catch(next);
}

function teamsShow(req, res, next) {
  Team
    .findById(req.params.id)
    .populate('players')
    .exec()
    .then((team) => {
      if(!team) return res.notFound();
      res.json(team);
    })
    .catch(next);
}

module.exports = {
  index: teamsIndex,
  show: teamsShow
};
