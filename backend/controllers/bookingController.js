import { Op } from 'sequelize';
import Booking from '../models/booking.js';
import Vehicle from '../models/vehicle.js';

// Create a new booking
export const createBooking = async (req, res) => {
  const { customerName, startDate, endDate, vehicleId } = req.body;

  // Get the userId from the authenticated user (set by authMiddleware)
  const userId = req.user;
console.log("@@",userId)
  // Basic validation of required fields
  if (!customerName || !startDate || !endDate || !vehicleId) {
    return res.status(400).json({ error: 'All fields are required: customerName, startDate, endDate, vehicleId' });
  }

  try {
    // Check if the vehicle exists
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // Check if the vehicle is already booked within the selected date range
    const existingBooking = await Booking.findOne({
      where: {
        vehicleId,
        // Check for overlapping bookings: startDate <= endDate and endDate >= startDate
        [Op.or]: [
          {
            startDate: {
              [Op.lte]: endDate
            },
            endDate: {
              [Op.gte]: startDate
            }
          }
        ]
      }
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Vehicle is already booked for the selected date range' });
    }

    // Create the new booking with the userId
    const newBooking = await Booking.create({
      customerName,
      startDate,
      endDate,
      vehicleId,
      userId // Save the userId in the booking
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error('Booking error:', error.message);
    return res.status(500).json({ error: 'Failed to create booking. Please try again later.' });
  }
};
