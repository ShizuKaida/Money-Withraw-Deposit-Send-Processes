//ATM Money Load Person Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonelSchema = new Schema ({

    name: String,
    surname: String,
    tc: String
    
    
    

})

module.exports = mongoose.model('personel',PersonelSchema)