const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      trackId: { type: Number },
      trackTitle: { type: String },
      artistId: { type: Number },
      artistName: { type: String },
      albumUrl: { type: String },
      lyricsLearned: [[Number]],
      lyricsTotal: { type: Number },
      percentLearned: { type: Number },
    },
  ],
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
