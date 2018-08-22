var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scoreSchema = new Schema({
  initials: String,
  numGuesses: Number,
  seconds: Number
}, {
  timestamps: true
});

// Uppercase initials and 3 chars
scoreSchema.pre('save', function(next) {
  var inits = this.initials;
  this.initials = inits.substr(0, 3).toUpperCase();
  next();
});

module.exports = mongoose.model('Score', scoreSchema);