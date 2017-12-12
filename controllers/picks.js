const Pick = require('../models/pick');

function picksIndex(req, res, next) {
  Pick
    .find(req.query)
    .populate('createdBy league champion runnerUp topScoringTeam mostYellowsTeam topScorer mostAssists mostYellows sentOff finalMoM')
    .exec()
    .then(picks => res.json(picks))
    .catch(next);
}

function picksCreate(req, res, next) {
  req.body.createdBy = req.currentUser;
  
  Pick
    .create(req.body)
    .then(pick => res.status(201).json(pick))
    .catch(next);
}

function picksShow(req, res, next) {
  Pick
    .findById(req.params.id)
    .populate('createdBy league champion runnerUp topScoringTeam mostYellowsTeam topScorer mostAssists mostYellows sentOff finalMoM')
    .exec()
    .then((pick) => {
      if(!pick) return res.notFound();
      res.json(pick);
    })
    .catch(next);
}

function picksUpdate(req, res, next) {
  Pick
    .findById(req.params.id)
    .exec()
    .then((pick) => {
      if(!pick) return res.notFound();
      pick = Object.assign(pick, req.body);
      return pick.save();
    })
    .then(pick => res.json(pick))
    .catch(next);
}

function picksDelete(req, res, next) {
  Pick
    .findById(req.params.id)
    .exec()
    .then((pick) => {
      if(!pick) return res.notFound();
      return pick.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: picksIndex,
  create: picksCreate,
  show: picksShow,
  update: picksUpdate,
  delete: picksDelete
};
