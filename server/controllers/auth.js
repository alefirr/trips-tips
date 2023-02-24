import User from '../models/User.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.json({
        message:
          'User with that name already exists.Please choose another username and try again',
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    await newUser.save();
    res.json({ newUser, message: 'The registration suceeded' });
  } catch (e) {
    res.json({ message: 'Error occured during registration', e: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: 'There is no such username' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      return res.json({ message: 'Login completed' });
    } else {
      return res.json({ message: 'Wrong password' });
    }
  } catch (e) {
    res.json({
      message: 'Error occured during login',
      e: e.message,
    });
  }
};
