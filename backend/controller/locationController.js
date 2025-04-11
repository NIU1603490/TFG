const Country = require('../models/country');
const City = require('../models/city');
const University = require('../models/university');

const getCountries = async (req, res) => {
    try {
        const countries = await Country.find().sort({ name: 1 });
        res.status(200).json({
            success: true,
            count: countries.length,
            countries
         });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
         });
    }
}

//get cities by countryId
const getCities = async (req, res) => {
    try {
        const { countryId } = req.query;
        if (!countryId) {
            return res.status(400).json({
                success: false,
                message: 'Country ID is required'
             });
        }
        const cities = await City.find({ country: countryId })
        .populate('country', 'name') 
        .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: cities.length,
            cities
         });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
         });
    }
}

//get universities by cityId
const getUniversities = async (req, res) => {
    try {
        const { cityId } = req.query;
        if (!cityId) {
            return res.status(400).json({
                success: false,
                message: 'City ID is required'
             });
        }
        // Check if the cityId is valid
        const universities = await University.find({ city: cityId })
        .populate('city', 'name')
        .populate('country', 'name')
        .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: universities.length,
            universities
         });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
         });
    }
}


module.exports = { getCountries, getCities, getUniversities};
