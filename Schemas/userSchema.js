const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: String,
    address: String,
    country: String
});

const User = mongoose.model('User', userSchema);
module.exports = User;