//Users mobile bank account balance model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BalanceSchema = new Schema ({
    tc: String,
    bakiye: Number
    
})

module.exports = mongoose.model('balances',BalanceSchema)