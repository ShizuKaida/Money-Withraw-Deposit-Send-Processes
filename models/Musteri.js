//Users information Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MusteriSchema = new Schema ({

    name: String,
    surname: String,
    tc: String,
    password: String
    
    

})

module.exports = mongoose.model('users',MusteriSchema)