const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const logger = require('../config/winston');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = new User({ name, email, password, role });
    await user.save();

    logger.info(`User registered: ${user.email}`);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    logger.error(`Error registering user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      logger.info(`User logged in: ${user.email}`);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      logger.warn(`Invalid login attempt: ${email}`);
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};
