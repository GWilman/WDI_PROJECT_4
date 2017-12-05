const router = require('express').Router();
const auth  = require('../controllers/auth');
const teams  = require('../controllers/teams');
const players  = require('../controllers/players');
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

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
