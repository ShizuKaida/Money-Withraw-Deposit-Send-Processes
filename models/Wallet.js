//Users cash money stock

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema ({
    tc: String,
    bes: Number,
    on: Number,
    yirmi: Number,
    elli: Number,
    yuz: Number,
    ikiyuz: Number
    
    

})

module.exports = mongoose.model('wallet',WalletSchema)