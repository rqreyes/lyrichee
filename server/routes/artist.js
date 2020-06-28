var express = require('express');
var router = express.Router();
const env = require('dotenv').config();

/* GET artist */
router.get('/:id', (req, res) => {
  const Genius = new (require('genius-lyrics').Client)(env.parsed.GENIUS_KEY);

  Genius.artists
    .get(`${req.params.id}`)
    .then((artist) => {
      artist.songs().then((tracks) => {
        res.json({ artist, tracks });
      });
    })
    .catch((err) => console.error(err));
});

module.exports = router;
