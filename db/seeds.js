const mongoose   = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
const rp = require('request-promise');
const _ = require('lodash');

const { dbURI } = require('../config/environment');

const User = require('../models/user');
const Team = require('../models/team');
const Player = require('../models/player');
const League = require('../models/league');
const Pick = require('../models/pick');

mongoose.connect(dbURI, { useMongoClient: true });

User.collection.drop();
Team.collection.drop();
Player.collection.drop();
League.collection.drop();
Pick.collection.drop();

rp({
  url: 'http://api.football-data.org/v1/competitions/464/teams',
  method: 'GET',
  headers: {'X-Auth-Token': 'b49c652413794b0ebfaf468f725a86bd'},
  json: true
})
  .then(data => {
    const playerData = data.teams.map(team => {
      return rp({
        url: team._links.players.href,
        method: 'GET',
        headers: {'X-Auth-Token': 'b49c652413794b0ebfaf468f725a86bd'},
        json: true
      });
    });

    const teamData = data.teams.filter(team => {
      team.teamId = parseFloat(team._links.self.href.match(/([0-9]+)$/)[1]);
      return ![751, 495, 611, 654, 732, 78, 548, 752, 675, 754, 498, 726, 721, 113, 734, 4].includes(team.teamId);
    });

    return Team
      .create(teamData)
      .then(createdTeams => {
        console.log(`${createdTeams.length} teams created`);
        return Promise.all(playerData)
          .then(playerData => {
            const createdPlayers = playerData.map(team => {
              const teamId = parseFloat(team._links.team.href.match(/([0-9]+)$/)[1]);
              const players = team.players.filter(player => {
                const team = _.find(createdTeams, { teamId });
                player.team = team;
                if (player.team) return player;
              });
              return Player.create(players);
            });

            return Promise.all(createdPlayers);
          });
      });
  })
  .then(players => console.log(`${players.length} squads created`))
  .catch(err => console.error(err))
  .finally(() => mongoose.connection.close());
