import express from 'express';

import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';
import { sequelize } from './Db/db.js';
const PORT = 8080
const app = express();
app.use(express.json());
app.use(cookieParser());
// Load the routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/user', userRoutes);
// Connect to the database and sync models
const syncModels = async () => {
    try {
      // This will sync all models and create the tables if they don't exist
      await sequelize.sync({ alter: true }); // Use { force: true } for forced sync (drops tables)
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  };
  
  // Call the sync function and then start the server
  const startServer = async () => {
    await syncModels(); // Ensure models are synced before starting the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  };
startServer();