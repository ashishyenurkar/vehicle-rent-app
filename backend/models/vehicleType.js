import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const VehicleType = sequelize.define('VehicleType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

VehicleType.associate = (models) => {
  VehicleType.hasMany(models.Vehicle, { foreignKey: 'typeId' });
};

export default VehicleType;
