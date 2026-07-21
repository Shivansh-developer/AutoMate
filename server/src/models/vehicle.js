const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vehicle = sequelize.define('Vehicle', {
  type: { type: DataTypes.ENUM('car', 'bike'), allowNull: false },
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  fuelType: { type: DataTypes.STRING },
  kmDriven: { type: DataTypes.INTEGER },
  transmission: { type: DataTypes.STRING },
  images: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  status: { type: DataTypes.ENUM('active', 'sold'), defaultValue: 'active' },
});

module.exports = Vehicle;