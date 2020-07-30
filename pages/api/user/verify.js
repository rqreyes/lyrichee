const jwt = require('jsonwebtoken');
const dbConnect = require('../../../utils/dbConnect');
const User = require('../../../models/userModel');

export default async (req, res) => {
  try {
    await dbConnect();
    const { token } = req.body;
    const verified = token
      ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) return false;
          return decoded;
        })
      : false;
    const user = verified ? await User.findById(verified.userId) : false;

    // if token and user are not verified, then return false
    if (!token || !verified || !user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
