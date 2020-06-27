var express = require('express');
var router = express.Router();
const env = require('dotenv').config();

/* GET lyrics */
router.get('/:search', (req, res) => {
  const Genius = new (require('genius-lyrics').Client)(env.parsed.GENIUS_KEY);

  Genius.tracks
    .search(req.params.search)
    .then((results) => {
      // const song = results[0];
      // console.log('results: ', results);
      // song.lyrics().then((lyrics) => {
      //   console.log(lyrics);
      // });
      res.json(results.slice(0, 20));
    })
    .catch((err) => console.error(err));
});

module.exports = router;
