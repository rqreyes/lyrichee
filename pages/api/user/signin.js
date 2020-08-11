const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../../utils/dbConnect');
const User = require('../../../models/userModel');

export default async (req, res) => {
  try {
    await dbConnect();
    const { email, password } = req.body;

    // if email or password are missing, then send an error
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // if email is not registered or if password is not a match, then send an error
    const user = await User.findOne({ email });
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
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
