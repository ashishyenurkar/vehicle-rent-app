import VehicleType from '../models/vehicleType.js';
import Vehicle from '../models/vehicle.js';

// Fetch all vehicle types
export const getVehicleTypes = async (req, res) => {
  try {
    const types = await VehicleType.findAll();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

// Fetch vehicles based on type
export const getVehiclesByType = async (req, res) => {
  const { typeId } = req.params;

  try {
    const vehicles = await Vehicle.findAll({ where: { typeId } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vehicles for this type' });
  }
};

// Create a new vehicle
export const createVehicle = async (req, res) => {
    const { name, typeId,model } = req.body;
  
    // Basic validation for required fields
    if (!name || !typeId) {
      return res.status(400).json({ error: 'Vehicle name and typeId are required' });
    }
  
    try {
      // Check if the vehicle type exists
      const vehicleType = await VehicleType.findByPk(typeId);
      if (!vehicleType) {
        return res.status(404).json({ error: 'Vehicle type not found' });
      }
  
      // Create a new vehicle
      const newVehicle = await Vehicle.create({
        name,
        typeId,
        model
      });
  
      // Respond with the created vehicle details
      res.status(201).json(newVehicle);
    } catch (error) {
      console.error('Error creating vehicle:', error);
      res.status(500).json({ error: 'Failed to create vehicle' });
    }
  };