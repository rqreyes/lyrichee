const jwt = require('jsonwebtoken');
const User = require('../../../models/userModel');

export default async (req, res) => {
  try {
    const { token } = req.query;
    const verified = token
      ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) return false;
          return decoded;
        })
      : false;
    const user = await User.findById(verified.userId);

    res.send(user.favorites);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
