import { RequestHandler } from 'express';
import User from '../models/user.model';
import { hashSync } from 'bcrypt';
import { errorHandler } from '../utils/error';

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
