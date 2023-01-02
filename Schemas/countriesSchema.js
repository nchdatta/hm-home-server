const mongoose = require('mongoose');
const countriesSchema = mongoose.Schema({
    name: String,
    code: String,
});

const Country = mongoose.model('Country', countriesSchema);
module.exports = Country;