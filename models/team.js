const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: { type: String },
  crestUrl: { type: String },
  teamId: { type: Number }
});

teamSchema.virtual('players', {
  ref: 'Player',
  localField: '_id',
  foreignField: 'team'
});

module.exports = mongoose.model('Team', teamSchema);
