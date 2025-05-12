import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Ruta no encontrada
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
