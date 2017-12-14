const socketIo = require('socket.io');

let connection = null;

function connect(server) {
  const io = socketIo(server);

  const nsp = io.of('/socket');
  const leagues = {};

  nsp.on('connection', socket => {
    console.log(`${socket.id} connected`);
    socket.on('set user', data => {
      leagues[data.leagueId] = leagues[data.leagueId] || {};
      leagues[data.leagueId].users = leagues[data.leagueId].users || [];

      leagues[data.leagueId].users.push(data.userId);
    });
    socket.on('draft started', leagueId => {
      const users = leagues[leagueId].users;
      console.log(leagueId, users);
      socket.emit('draft users', users);
    });
    socket.on('pick made', data => socket.broadcast.emit('pickMade', data));
    socket.on('draft finished', leagueId => {
      delete leagues[leagueId];
      socket.emit('draft finished');
    });
  });


  connection = nsp;
  return connection;
}

function getConnection() {
  return connection;
}

module.exports = { connect, getConnection };
