const express = require('express');
const User = require('../Schemas/userSchema');
const userRouter = express.Router();


// Get all users 
userRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error occured on accessing users.' });
    }
})

// Create a user 
userRouter.post('/', async (req, res) => {
    try {
        const filter = { email: req.body.email };
        const exists = await User.findOne(filter);
        if (!exists) {
            const userDoc = new User(req.body);
            await userDoc.save();
            res.json({ success: true });
        } else {
            res.status(403).json({ success: false, message: 'Already have a user with this email.' });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error occured on inserting user.' });
    }
})


module.exports = userRouter;