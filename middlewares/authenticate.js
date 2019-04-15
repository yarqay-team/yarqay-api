var jwt = require('jsonwebtoken');
var config = require('../config');
module.exports.authenticate = function (req,res,next) {
  var token = req.body.token || req.query.token || req.headers.authorization;
  if(!token) return res.sendStatus(401);
  jwt.verify(token,config.secret,function (err,decoded) {
    if(err) return res.sendStatus(401);
    req.headers.user = decoded;
    next();
  })
}
