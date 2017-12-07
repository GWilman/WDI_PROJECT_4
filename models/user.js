const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: 'Username is required.', unique: 'That username has already been taken.' },
  email: { type: String, required: 'Email is required.', unique: 'That email has already been taken.' },
  image: { type: String },
  password: { type: String, required: 'Password is required.' },
  leagues: [{ type: mongoose.Schema.ObjectId, ref: 'League' }],
  picks: [{ type: mongoose.Schema.ObjectId, ref: 'Pick' }]
}, {
  timestamps: true
});

// userSchema
//   .virtual('hasMadeAPick')
//   .get()

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (this.isNew) {
    if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Passwords do not match.');
    }
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
