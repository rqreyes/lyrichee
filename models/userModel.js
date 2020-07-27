const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      trackId: { type: String },
      lines: [Number],
      linesTotal: { type: Number },
      percentLearned: { type: Number },
    },
  ],
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
