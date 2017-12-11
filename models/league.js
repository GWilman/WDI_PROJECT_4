const mongoose = require('mongoose');

const leagueSchema = new mongoose.Schema({
  name: { type: String, required: 'A league name is required.' },
  stake: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  code: { type: Number, required: true }
}, {
  timestamps: true
});

leagueSchema
  .virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'leagues'
  });

leagueSchema
  .virtual('picks', {
    ref: 'Pick',
    localField: '_id',
    foreignField: 'league'
  });

module.exports = mongoose.model('League', leagueSchema);
