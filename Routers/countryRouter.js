const express = require('express');
const Country = require('../Schemas/countriesSchema');
const countryRouter = express.Router();

// Get all countries
countryRouter.get('/', async (req, res) => {
    try {
        const countries = await Country.find({}, { _id: 0 });
        res.status(200).json(countries);
    } catch (err) {
        res.status(500).json({ message: 'Error occured on accessing countries.' });
    }
})


module.exports = countryRouter;