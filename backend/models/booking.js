import { DataTypes } from 'sequelize';

import Vehicle from './vehicle.js';
import { sequelize } from '../Db/db.js';
import User from './user.js';  // Import the User model


const Booking = sequelize.define('Booking', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Vehicle,
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,  // Reference to the User model
      key: 'id',
    },
    allowNull: true,
  },
});

// Define associations
Booking.associate = (models) => {
  Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  Booking.belongsTo(models.User, { foreignKey: 'userId' });  // Associate Booking with User
};

export default Booking;

