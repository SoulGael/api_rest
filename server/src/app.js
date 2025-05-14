import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import {errorHandler} from './middlewares/errorHandler.js';
import usersModule from './modules/users/users.routes.js';
import parentsModule from './modules/parents/parents.routes.js';

dotenv.config();
const app = express();

app.use(express.json());

connectDB();

usersModule(app);
parentsModule(app);

app.use((req, res) => {
  res.status(404).json({success: false, message: 'Route not found'});
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
