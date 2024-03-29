import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import cookieParser from 'cookie-parser';

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
