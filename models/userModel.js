const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  favorites: [
    {
      trackId: { type: Number },
      trackTitle: { type: String },
      artistId: { type: Number },
      artistName: { type: String },
      albumUrl: { type: String },
      lyricsIdxLearned: [[Number]],
      lyricsLinesLearned: { type: Number },
      lyricsLinesTotal: { type: Number },
      percentLearned: { type: Number },
    },
  ],
});

module.exports = mongoose.models.user || mongoose.model('user', userSchema);
