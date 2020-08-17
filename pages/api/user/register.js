const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbConnect = require('../../../utils/dbConnect');
const User = require('../../../models/userModel');
const sgMail = require('@sendgrid/mail');

export default async (req, res) => {
  try {
    await dbConnect();
    const { email, password, passwordConfirm } = req.body;

    // if email or password are missing, then send an error
    if (!email || !password || !passwordConfirm) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required' });
    }

    // if passwords are less than 10 characters, then send an error
    if (password.length < 10 || passwordConfirm.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Passwords must be at least 10 characters long',
      });
    }

    // if passwords do not match, then send an error
    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ success: false, message: 'Passwords must match' });
    }

    // if email already exists, then send an error
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists',
      });
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

    // generate email JWT for user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });

    // send verification email
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
      to: email,
      from: {
        name: 'Lyrichee',
        email: 'noreply@lyrichee.com',
      },
      subject: 'Welcome to Lyrichee! Verify Your Email Account',
      text: `
        Verify your email account on Lyrichee by clicking on the link below.\n
        Your verification token will expire in 2 days.\n
        ${
          process.env.BASE_URL || process.env.VERCEL_URL
        }/signin?token=${token}`,
      html: `
        <p>Verify your email account on Lyrichee by clicking on the button below.</p>
        <p>Your verification token will expire in 2 days.</p>
        <a href='${
          process.env.BASE_URL || process.env.VERCEL_URL
        }/signin?token=${token}' target='_blank'><button type='button' style='color: #fff; background: #e04666; padding: 10px 20px; border: 0; border-radius: 4px;'>Verify Email Account</button></a>
      `,
    };
    sgMail.send(msg);

    res.json({
      success: true,
      message: 'Email sent! Check your email to verify your account',
    });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};
