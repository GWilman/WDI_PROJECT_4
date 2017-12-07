const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .populate('leagues picks leagues.createdBy')
    .exec()
    .then(users => res.status(200).json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate('leagues picks leagues.createdBy')
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      res.json(user);
    })
    .catch(next);
}

function usersUpdate(req, res, next) {
  for (var i = 0; i < req.body.leagues.length; i++) {
    if (req.body.leagues[i].id) {
      req.body.leagues[i] = req.body.leagues[i].id;
    }
  }
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      for ( const field in req.body) {
        user[field] = req.body[field];
      }
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
