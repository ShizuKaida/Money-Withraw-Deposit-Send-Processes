const mongoose = require('mongoose');
require('dotenv').config()

module.exports = () => {
    mongoose.connect(process.env.DB_CONNECTION)

    mongoose.connection.on('open',()=>{
        console.log('MongoDB Baglandi Durumu Baglandi')


    })
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB Baglandi Durumu : Baglanti Hatasi',err)
    })

}