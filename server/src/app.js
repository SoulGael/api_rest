import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {errorHandler} from './middlewares/errorHandler.js';
import userRoutes from './modules/users/user.routes.js';
import parentRoutes from './modules/parents/parent.routes.js';

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

app.use('/api/users', userRoutes);
app.use('/api/parents', parentRoutes);

app.use((req, res) => {
  res.status(404).json({success: false, message: 'Route not found'});
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
