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

mongoose.connect(dbURI, { useMongoClient: true });

User.collection.drop();
Team.collection.drop();
Player.collection.drop();
League.collection.drop();

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

    const teamData = data.teams.map(team => {
      team.teamId = parseFloat(team._links.self.href.match(/([0-9]+)$/)[1]);
      return team;
    });

    return Team
      .create(teamData)
      .then(createdTeams => {
        console.log(createdTeams);
        console.log(`${createdTeams.length} teams created`);
        return Promise.all(playerData)
          .then(playerData => {
            // console.log(playerData);
            const createdPlayers = playerData.map(team => {
              const teamId = parseFloat(team._links.team.href.match(/([0-9]+)$/)[1]);
              const players = team.players.map(player => {
                const team = _.find(createdTeams, { teamId });
                player.team = team;
                console.log(player);
                return player;
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
