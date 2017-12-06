const League = require('../models/league');

function leaguesIndex(req, res, next) {
  League
    .find()
    .populate('createdBy users')
    .exec()
    .then(leagues => res.json(leagues))
    .catch(next);
}

function leaguesCreate(req, res, next) {
  req.body.createdBy = req.currentUser;

  League
    .create(req.body)
    .then(league => res.status(201).json(league))
    .catch(next);
}

function leaguesShow(req, res, next) {
  League
    .findById(req.params.id)
    .populate('createdBy users')
    .exec()
    .then((league) => {
      if(!league) return res.notFound();
      res.json(league);
    })
    .catch(next);
}

function leaguesUpdate(req, res, next) {
  League
    .findById(req.params.id)
    .exec()
    .then((league) => {
      if(!league) return res.notFound();
      league = Object.assign(league, req.body);
      return league.save();
    })
    .then(league => res.json(league))
    .catch(next);
}

function leaguesDelete(req, res, next) {
  League
    .findById(req.params.id)
    .exec()
    .then((league) => {
      if(!league) return res.notFound();
      return league.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: leaguesIndex,
  create: leaguesCreate,
  show: leaguesShow,
  update: leaguesUpdate,
  delete: leaguesDelete
};
