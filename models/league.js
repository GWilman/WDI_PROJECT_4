const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: 'A league name is required.' },
  stake: { type: String, required: true }
});

module.exports = mongoose.model('League', leagueSchema);
