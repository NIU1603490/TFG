const express = require('express');
const router = express.Router();
const locationController = require('../controller/locationController');

router.get('/countries', locationController.getCountries);
router.get('/cities', locationController.getCities);
router.get('/universities', locationController.getUniversities);

module.exports = router;