const Inquiry = require('../models/Inquiry');
const Vehicle = require('../models/Vehicle');

const createInquiry = async (req, res) => {
  try {
    const { vehicleId, buyerId, message } = req.body;
    const vehicle = await Vehicle.findByPk(vehicleId);
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    const inquiry = await Inquiry.create({ vehicleId, buyerId, message });
    res.status(201).json({ message: 'Inquiry sent successfully', inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll();
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createInquiry, getInquiries };