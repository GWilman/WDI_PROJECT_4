const mongoose = require('mongoose');

const pickSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  league: { type: mongoose.Schema.ObjectId, ref: 'League' },
  champions: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  finalLosers: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  topScoringTeam: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  mostYellowsTeam: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  topScorer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  mostAssists: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  mostYellows: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  sentOff: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  finalMoM: { type: mongoose.Schema.ObjectId, ref: 'Player' }
});

module.exports = mongoose.model('Pick', pickSchema);
