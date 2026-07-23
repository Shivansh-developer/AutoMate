const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CarCatalog = sequelize.define('CarCatalog', {
  brand: { type: DataTypes.STRING, allowNull: false },
  model: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  priceMin: { type: DataTypes.FLOAT },
  priceMax: { type: DataTypes.FLOAT },
  fuelTypes: { type: DataTypes.STRING },
  mileage: { type: DataTypes.STRING },
  engine: { type: DataTypes.STRING },
  transmission: { type: DataTypes.STRING },
  seating: { type: DataTypes.INTEGER },
  imageUrl: { type: DataTypes.STRING },
});

module.exports = CarCatalog;