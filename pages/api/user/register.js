const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../../utils/dbConnect');
const User = require('../../../models/userModel');

export default async (req, res) => {
  try {
    await dbConnect();
    const { email, password, passwordConfirm } = req.body;

    // if email or password are missing, then send an error
    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // if passwords do not match, then send an error
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords must match' });
    }

    // if email already exists, then send an error
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res
        .status(400)
        .json({ message: 'An account with this email already exists' });
    }

    // generate hashed password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // store the user into database
    const user = new User({
      email,
      password: passwordHash,
    });
    await user.save();

    // generate JWT for user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
    });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
