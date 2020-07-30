const geniusLyrics = require('genius-lyrics');

const Genius = new geniusLyrics.Client(process.env.GENIUS_KEY);

export default async (req, res) => {
  try {
    const artist = await Genius.artists.get(req.query.id);
    const tracks = await artist.songs({ per_page: 10, sort: 'popularity' });

    res.json({ artist, tracks });
  } catch (err) {
    res.status(200).json(err);
  }
};
