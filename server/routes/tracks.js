var express = require('express');
var router = express.Router();
const env = require('dotenv').config();

/* GET tracks */
router.get('/:id', (req, res) => {
  const Genius = new (require('genius-lyrics').Client)(env.parsed.GENIUS_KEY);

  Genius.tracks
    .get(req.params.id)
    .then((track) => {
      track.lyrics().then((lyrics) => res.json({ track, lyrics }));
    })
    .catch((err) => console.error(err));
});

module.exports = router;