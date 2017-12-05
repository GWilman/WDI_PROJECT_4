const router = require('express').Router();
const auth  = require('../controllers/auth');
const teams  = require('../controllers/teams');
const players  = require('../controllers/players');
const leagues  = require('../controllers/leagues');
const users  = require('../controllers/users');
// const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/teams')
  .get(teams.index);

router.route('/teams/:id')
  .get(teams.show);

router.route('/players')
  .get(players.index);

router.route('/players/:id')
  .get(players.show);

router.route('/leagues')
  .get(leagues.index)
  .post(leagues.create);

router.route('/leagues/:id')
  .get(leagues.show)
  .put(leagues.update)
  .delete(leagues.delete);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
