import { RequestHandler } from 'express';

export const test: RequestHandler = (req, res) => {
  res.send('Hello from user route');
};
