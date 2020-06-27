var express = require('express');
var router = express.Router();
const env = require('dotenv').config();

/* GET tracks search */
router.get('/', (req, res) => {
  const Genius = new (require('genius-lyrics').Client)(env.parsed.GENIUS_KEY);

  Genius.tracks
    .search(req.query.q)
    .then((results) => res.json(results))
    .catch((err) => console.error(err));
});

module.exports = router;
