const CarCatalog = require('../models/CarCatalog');
const { Op } = require('sequelize');

const getCatalog = async (req, res) => {
  try {
    const { search, brand, category } = req.query;
    const where = {};
    if (brand) where.brand = brand;
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { brand: { [Op.iLike]: `%${search}%` } },
        { model: { [Op.iLike]: `%${search}%` } },
      ];
    }
    const cars = await CarCatalog.findAll({ where, order: [['brand', 'ASC']] });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getCatalogById = async (req, res) => {
  try {
    const car = await CarCatalog.findByPk(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getCatalog, getCatalogById };