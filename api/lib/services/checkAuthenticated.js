var jwt = require('jwt-simple');
var moment = require('moment');

module.exports = function checkAuthenticated(req, res, next) {
    if(!req.header('Authorization')) {
        return res.status(401).send({
            message: 'Please make sure your request has an Authorization header'
        });
    }
    var token = req.header('Authorization').split(' ')[1];
    var payload = jwt.decode(token, '_o0OMd9#ud');
    
    if(payload.exp <= moment().unix()){
        return res.status(401).send({
            message: 'Token has expired'
        });
    }
    console.log(payload);
    req.user = {};
    req.user._id = payload.sub;
    req.user.displayName = payload.name;
    next();
}