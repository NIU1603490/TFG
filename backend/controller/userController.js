const User = require('../models/user');
const Country = require('../models/country');
const City = require('../models/city');
const University = require('../models/university');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    try {
        const { name, lastName, email, password, country, city, phone, university } = req.body;
        // Check if user already exists

        if(await User.findOne({ email })) { 
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            lastName,
            email,
            password: hashedPassword,
            country,
            city,
            phone,
            university,
        });
        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: newUser
        });
    } catch(error) {
        res.status(500).json({ success: false, message: 'Error creating user', error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) { // Check if email and password are provided
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid email or password' });
        }

        // Generate a token (you can use JWT or any other method)
        /**
         * TO DO: Generate a token here
         * 
         * 
         * 
         **/

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                country: user.country,
                city: user.city,
                phone: user.phone,
                university: user.university,
            },
            // token: 'your_generated_token_here' // Replace with actual token
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Error logging in',
            error });
        
    }
}

//get user authenticated
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate('country', 'name')
            .populate('city', 'name')
            .populate('university', 'name');
        
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: 'Error fetching user',
            error 
        });
    }
}

module.exports = {
    register,
    login,
    getUser
};