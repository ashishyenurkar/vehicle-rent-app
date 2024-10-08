import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';
import VehicleType from './vehicleType.js';

const Vehicle = sequelize.define('Vehicle', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  typeId: {
    type: DataTypes.INTEGER,
    references: {
      model: VehicleType,
      key: 'id',
    },
    allowNull: false, // It's a good idea to ensure typeId cannot be null
  },
});

// Setting up the association
Vehicle.associate = (models) => {
  Vehicle.belongsTo(models.VehicleType, { foreignKey: 'typeId' });
};

export default Vehicle;
