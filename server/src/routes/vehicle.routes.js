const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const { createVehicle, getVehicles, getVehicleById, compareVehicles } = require('../controller/vehicle.controller');

router.post('/', upload.array('images', 5), createVehicle);
router.get('/', getVehicles);
router.get('/:id', getVehicleById);
router.post('/compare', compareVehicles);

module.exports = router;