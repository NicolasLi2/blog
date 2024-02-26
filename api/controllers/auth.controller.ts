import { RequestHandler } from 'express';
import User from '../models/user.model';
import { hashSync } from 'bcrypt';

export const signup: RequestHandler = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error });
  }
};
