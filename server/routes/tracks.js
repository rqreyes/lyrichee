var express = require('express');
var router = express.Router();
const env = require('dotenv').config();

/* GET tracks */
router.get('/:search', (req, res) => {
  const Genius = new (require('genius-lyrics').Client)(env.parsed.GENIUS_KEY);

  Genius.tracks
    .search(req.params.search)
    .then((results) => res.json(results))
    .catch((err) => console.error(err));
});

router.get('/lyrics/:id', (req, res) => {
  const Genius = new (require('genius-lyrics').Client)(env.parsed.GENIUS_KEY);

  Genius.tracks
    .get(req.params.id)
    .then((track) => {
      track.lyrics().then((lyrics) => res.json({ track, lyrics }));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
