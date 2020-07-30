const geniusLyrics = require('genius-lyrics');

const Genius = new geniusLyrics.Client(process.env.GENIUS_KEY);

export default async (req, res) => {
  try {
    const track = await Genius.tracks.get(req.query.id);
    // const lyrics = await track.lyrics();
    res.json({ track, lyrics });
  } catch (err) {
    res.status(200).json(err);
  }
};
