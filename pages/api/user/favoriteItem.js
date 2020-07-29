const jwt = require('jsonwebtoken');
import { flatten } from 'array-flatten';
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

        const favoriteItem = user.favorites.find(
          ({ trackId }) => trackId === trackData.trackId
        );
        if (favoriteItem) {
          favoriteItem.lyricsLearned = trackData.lyricsLearned;
          favoriteItem.percentLearned =
            flatten(trackData.lyricsLearned).filter((line) => line !== null)
              .length / trackData.lyricsTotal;
        } else user.favorites.push(trackData);
        user.save();

        res.send('Added / Updated favorite successful');
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
