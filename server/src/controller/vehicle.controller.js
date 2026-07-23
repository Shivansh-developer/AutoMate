const Vehicle = require('../models/Vehicle');
const { Op } = require('sequelize');

const createVehicle = async (req, res) => {
  try {
    const { type, brand, model, year, price, fuelType, kmDriven, transmission } = req.body;
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const vehicle = await Vehicle.create({
      type, brand, model, year, price, fuelType, kmDriven, transmission,
      images: imagePaths,
    });

    res.status(201).json({ message: 'Vehicle listed successfully', vehicle });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getVehicles = async (req, res) => {
  try {
    const { type, brand, fuelType, transmission, maxPrice, minPrice, search } = req.query;
    const where = {};

    if (type) where.type = type;
    if (brand) where.brand = brand;
    if (fuelType) where.fuelType = fuelType;
    if (transmission) where.transmission = transmission;

    if (maxPrice || minPrice) {
      where.price = {};
      if (maxPrice) where.price[Op.lte] = maxPrice;
      if (minPrice) where.price[Op.gte] = minPrice;
    }

    if (search) {
      where[Op.or] = [
        { brand: { [Op.iLike]: `%${search}%` } },
        { model: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const vehicles = await Vehicle.findAll({ where, order: [['createdAt', 'DESC']] });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const compareVehicles = async (req, res) => {
  try {
    const { ids } = req.body;
    const vehicles = await Vehicle.findAll({ where: { id: ids } });
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createVehicle, getVehicles, getVehicleById, compareVehicles };