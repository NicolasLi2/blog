import { RequestHandler } from 'express';
import { errorHandler } from '../utils/error';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

export const test: RequestHandler = (req, res) => {
  res.send('Hello from user route');
};

export const updateUser: RequestHandler = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandler(400, 'Password must be at least 6 characters long')
      );
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 3 and 20 characters long')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username must not contain spaces'));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
