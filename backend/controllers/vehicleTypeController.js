import VehicleType from '../models/vehicleType.js';

// Create a new vehicle type
export const createVehicleType = async (req, res) => {
  const { name } = req.body;

  // Basic validation for the required field
  if (!name) {
    return res.status(400).json({ error: 'Vehicle type name is required' });
  }

  try {
    // Check if the vehicle type already exists
    const existingType = await VehicleType.findOne({ where: { name } });
    if (existingType) {
      return res.status(400).json({ error: 'Vehicle type already exists' });
    }

    // Create a new vehicle type
    const newVehicleType = await VehicleType.create({ name });

    // Respond with the created vehicle type details
    res.status(201).json(newVehicleType);
  } catch (error) {
    console.error('Error creating vehicle type:', error);
    res.status(500).json({ error: 'Failed to create vehicle type' });
  }
};
