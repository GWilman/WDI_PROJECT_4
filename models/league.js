const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: 'A league name is required.' },
  stake: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

leagueSchema.virtual('users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'leagues'
});

module.exports = mongoose.model('League', leagueSchema);
