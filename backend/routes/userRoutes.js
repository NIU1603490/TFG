const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

router.get('/', userController.getUsers); // Get all users
router.post('/', userController.createUser); // create a new user

module.exports = router; // Export the router for use in app.js
