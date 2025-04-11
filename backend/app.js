const express = require('express');
const cors = require('cors');
//const dotenv = require('dotenv');

//routes
// const userRoutes = require('./routes/userRoutes.js');
// const productRoutes = require('./routes/productRoutes.js');
// const transactionRoutes = require('./routes/transactionRoutes.js');
// const locationRoutes = require('./routes/locationRoutes.js');
// const followRoutes = require('./routes/followRoutes.js');



//initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes
// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/transactions', transactionRoutes);
// app.use('/api/locations', locationRoutes);
// app.use('/api/follows', followRoutes);


// root route
app.get('/', (req, res) => {
  res.send('Welcome to the backend API!');
});

module.exports = app; // Export the app for use in server.js