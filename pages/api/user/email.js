const jwt = require('jsonwebtoken');
const dbConnect = require('../../../utils/dbConnect');
const User = require('../../../models/userModel');

export default async (req, res) => {
  try {
    await dbConnect();
    const { token } = req.query;
    const verified = token
      ? jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) return false;
          return decoded;
        })
      : false;
    const user = await User.findById(verified.userId);

    user.confirmed = true;
    user.save();

    res.json({
      success: true,
      message: 'Your email has been verified! Sign in and start learning',
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};
