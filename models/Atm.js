const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AtmSchema = new Schema ({
    semt: String,
    bes: Number,
    on: Number,
    yirmi: Number,
    elli: Number,
    yuz: Number,
    ikiyuz: Number
    
    

})

module.exports = mongoose.model('atm-bakiye',AtmSchema)