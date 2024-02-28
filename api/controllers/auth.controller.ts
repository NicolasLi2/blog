import { RequestHandler } from 'express';
import User from '../models/user.model';
import { hashSync, compareSync } from 'bcrypt';
import { errorHandler } from '../utils/error';
import jwt from 'jsonwebtoken';

export const signup: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // return res.status(400).json({ message: 'All fields are required' });
    next(errorHandler(400, 'All fields are required'));
  }

  const hashedPassword = hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    // res.json({ message: 'User created' });
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
};

export const signin: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(400, 'Invalid email or password'));
    }
    const isMatch = compareSync(password, user.password);
    if (!isMatch) {
      return next(errorHandler(400, 'Invalid email or password'));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
