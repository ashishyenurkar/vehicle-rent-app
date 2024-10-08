import express from 'express';
import { createVehicle, getVehicleTypes, getVehiclesByType } from '../controllers/vehicleController.js';
import { createVehicleType } from '../controllers/vehicleTypeController.js';

const router = express.Router();

router.get('/types', getVehicleTypes);
router.get('/types/:typeId/vehicles', getVehiclesByType);
router.post('/create-vehicle', createVehicle);
router.post('/create-vehicle-type', createVehicleType);

export default router;
