// Code written by Therese Bruzell
// Require dotenv
require('dotenv').config();

// Require constants
const cors = require('cors')
const express = require('express');
const app = express();
const mongoose = require('mongoose')


// // Connect to database
mongoose.connect(process.env.DATABASE, {useNewUrlParser:  true});

// Allow other servers use api
app.use(cors());

// Open json use
app.use(express.json());
const womenRouter = require('./routes/women')
app.use('/women', womenRouter)

// Listen to port
app.listen(process.env.PORT || 8080, () => console.log('Server started'));
