// Code written by Therese Bruzell
// Declaring mongoose Schema
const mongoose = require('mongoose');

const womanSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
    },
    years:{
        type: String,
        required: false,
    },
    quote:{
        type: String,
        required: false,
    },
    description:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required:false,
    },
    category:{
        type: String,
        required: true,
    }
},
{ collection: 'women' }
)


module.exports = mongoose.model('women', womanSchema);