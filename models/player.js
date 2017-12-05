const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  nationality: { type: String, required: true },
  team: { type: mongoose.Schema.ObjectId, ref: 'Team' }
});

module.exports = mongoose.model('Player', playerSchema);
