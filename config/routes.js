const router = require('express').Router();
const auth  = require('../controllers/auth');
const users  = require('../controllers/users');
const teams  = require('../controllers/teams');
const players  = require('../controllers/players');
const leagues  = require('../controllers/leagues');
const picks  = require('../controllers/picks');
// Add secure route to all applicable (currently tested on league create - works(adds createdBy))
const secureRoute = require('../lib/secureRoute');

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users')
  .get(users.index);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

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
  .post(secureRoute, leagues.create);

router.route('/leagues/:id')
  .get(leagues.show)
  .put(leagues.update)
  .delete(leagues.delete);

router.route('/picks')
  .get(picks.index)
  .post(secureRoute, picks.create);

router.route('/picks/:id')
  .get(picks.show)
  .put(picks.update)
  .delete(picks.delete);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
