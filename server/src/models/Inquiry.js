const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Inquiry = sequelize.define('Inquiry', {
  vehicleId: { type: DataTypes.INTEGER, allowNull: false },
  buyerId: { type: DataTypes.INTEGER, allowNull: false },
  message: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('pending', 'contacted', 'closed'), defaultValue: 'pending' },
});

module.exports = Inquiry;