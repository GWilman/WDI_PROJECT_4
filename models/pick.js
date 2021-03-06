const mongoose = require('mongoose');

const pickSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  league: { type: mongoose.Schema.ObjectId, ref: 'League' },
  champion: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  runnerUp: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  topScoringTeam: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  mostYellowsTeam: { type: mongoose.Schema.ObjectId, ref: 'Team' },
  topScorer: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  mostAssists: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  mostYellows: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  sentOff: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  finalMoM: { type: mongoose.Schema.ObjectId, ref: 'Player' },
  championPoints: { type: Number, default: undefined },
  runnerUpPoints: { type: Number, default: undefined },
  topScoringTeamPoints: { type: Number, default: undefined },
  mostYellowsTeamPoints: { type: Number, default: undefined },
  topScorerPoints: { type: Number, default: undefined },
  mostAssistsPoints: { type: Number, default: undefined },
  mostYellowsPoints: { type: Number, default: undefined },
  sentOffPoints: { type: Number, default: undefined },
  finalMoMPoints: { type: Number, default: undefined }
}, {
  timestamps: true
});

pickSchema
  .virtual('totalPoints')
  .get(function() {
    return (this.championPoints + (this.runnerUpPoints || 0) + (this.topScoringTeamPoints || 0) + (this.mostYellowsTeamPoints || 0) + (this.topScorerPoints || 0) + (this.mostAssistsPoints || 0) + (this.mostYellowsPoints || 0) + (this.sentOffPoints || 0) + (this.finalMoMPoints || 0));
  });

module.exports = mongoose.model('Pick', pickSchema);
