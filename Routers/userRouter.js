const express = require('express');
const User = require('../Schemas/userSchema');
const userRouter = express.Router();

// Get all users 
userRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const users = await User.find().skip((page - 1) * limit).limit(limit);
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error occured on accessing users.' });
    }
})

// Total users 
userRouter.get('/total-user', async (req, res) => {
    try {
        const total = await User.countDocuments();
        res.status(200).json(total);
    } catch (err) {
        res.status(500).json({ message: 'Error occured on counting users.' });
    }
})


// Get a single user 
userRouter.get('/:email', async (req, res) => {
    try {
        const filter = { email: req.params.email };
        const user = await User.findOne(filter);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error occured on accessing user.' });
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

// Update user profile
userRouter.put('/update-profile/:email', async (req, res) => {
    try {
        const { name, email, phone, address, country } = req.body;
        const filter = { email: req.params.email };
        const updateDoc = { $set: { name: name, email: email, phone: phone, address: address, country: country } };
        const user = await User.updateOne(filter, updateDoc, { upsert: true });
        res.json({ success: true, user });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error occured on updating user profile.' });
    }
})

// Delete a user 
userRouter.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id, { new: true });
        res.json({ success: true, message: 'User deleted successfuly.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error occured on deleting user.' });
    }
})


module.exports = userRouter;