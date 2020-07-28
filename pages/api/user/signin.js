const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../../utils/dbConnect');
const User = require('../../../models/userModel');

export default async (req, res) => {
  try {
    await dbConnect();
    const { username, password } = req.body;

    // if username or password are missing, then send an error
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // if username is not registered or if password is not a match, then send an error
    const user = await User.findOne({ username });
    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    if (!user || !isMatch) {
      return res.status(400).json({ message: 'Credentials are invalid' });
    }

    // generate JWT for user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
