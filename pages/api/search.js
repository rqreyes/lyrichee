const geniusLyrics = require('genius-lyrics');

const Genius = new geniusLyrics.Client(process.env.GENIUS_KEY);

export default async (req, res) => {
  try {
    const results = await Genius.tracks.search(req.query.q);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
  }
};
