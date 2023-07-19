const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Checking token with header
    const token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
      if (err) {
        res.json({
          status: false,
          message: 'Token doğrulama başarısız oldu'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json({
      status: false,
      message: 'Geçerli bir token bulunamadı'
    });
  }
};
