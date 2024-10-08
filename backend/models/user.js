import { DataTypes } from 'sequelize';
import { sequelize } from '../Db/db.js';

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define association with Booking
User.associate = (models) => {
  User.hasMany(models.Booking, { foreignKey: 'userId' });
};

export default User;
