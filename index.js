const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./Routers/userRouter');
require('dotenv').config();
const app = express();
const port = process.env.PORT;

// Middleware 
app.use(cors());
app.use(express.json());


// Mongoose connection 
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.h4urcla.mongodb.net/hm-home?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(uri)
    .then(() => console.log('Connection successful.'))
    .catch(err => console.log(err.message));


// User route 
app.use('/user', userRouter);



app.get('/', (req, res) => {
    res.send('Home');
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});