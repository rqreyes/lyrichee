const jwt = require('jsonwebtoken');
const User = require('../../../models/userModel');

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const { token, queryId } = req.query;
        const verified = token
          ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) return false;
              return decoded;
            })
          : false;
        const user = await User.findById(verified.userId);

        res.send(
          user.favorites.find(({ trackId }) => trackId === parseInt(queryId)) ||
            false
        );
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'POST':
      try {
        const { token, trackData } = req.body;
        const verified = token
          ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) return false;
              return decoded;
            })
          : false;
        const user = await User.findById(verified.userId);

        user.favorites.push(trackData);
        user.save();

        res.send('Added favorite successful');
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const { token, queryId } = req.query;
        const verified = token
          ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
              if (err) return false;
              return decoded;
            })
          : false;
        const user = await User.findById(verified.userId);

        user.favorites = user.favorites.filter(
          ({ trackId }) => trackId !== parseInt(queryId)
        );
        user.save();

        res.send('Deleted favorite successful');
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(500).json({ error: false });
      break;
  }
};

// {
//   trackId: { type: String },
//   trackTitle: { type: String },
//   trackArtist: { type: String },
//   albumUrl: { type: String },
//   lines: [Number],
//   linesTotal: { type: Number },
//   percentLearned: { type: Number },
// },
