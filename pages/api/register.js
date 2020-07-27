const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../utils/dbConnect');
const User = require('../../models/userModel');

export default async (req, res) => {
  try {
    await dbConnect();
    const { username, password } = req.body;

    // if username or password are missing, then send an error
    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // if username already exists, then send an error
    const userExisting = await User.findOne({ username });
    if (userExisting) {
      return res
        .status(400)
        .json({ message: 'An account with this username already exists' });
    }

    // generate hashed password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // store the user into database
    const user = new User({
      username,
      password: passwordHash,
    });
    await user.save();

    // generate JWT for user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
