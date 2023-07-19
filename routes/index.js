var express = require('express');
var router = express.Router();
const Musteri = require('../models/Musteri');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');




//User Checking Endpoint
router.post('/authenticate', async (req, res) => {
  const { tc, password } = req.body;
  
  const musteri = await Musteri.findOne({ tc, password });
  
  if (!musteri) {
    return res.json({
      status: false,
      message: 'Kimlik doğrulama başarisiz.'
    });
  }
  
  const result = bcrypt.compare(password, musteri.password);
  
  if (!result) {
    return res.json({
      status: false,
      message: 'Yanliş şifre.'
    });
  }
  
  const payload = {
    tc
  };
  const token = jwt.sign(payload, req.app.get('api_secret_key'), { expiresIn: 120 });
        
  res.json({
    status: true,
    token
  });
});

module.exports = router;
