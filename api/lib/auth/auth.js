'use strict';

var User = require('../users/user'),
    jwt = require('jwt-simple'),
    moment = require('moment');

module.exports = {
    register: function(req, res) {

        User.findOne({
            email: req.body.user.email
        }, function(err, existingUser) {

            if (existingUser)
                return res.status(409).send({
                    message:'Email is already registered'
                });
            var user = new User(req.body.user);
            user.displayName = user.firstName + ' ' + user.lastName;

            user.save(function(err, result) {
                if (err) {
                    res.status(500).send({
                        message: 'Could not register new user!'
                    });
                }
                res.status(201).send({
                    token: createToken(result)
                });
            })
        });
    },
    login: function(req, res) {
        User.findOne({
            email: req.body.login.email
        }, function(err, user) {

            if (!user)
                return res.status(401).send({
                    message: 'Not registered!'
                });
            var encodedPassword = jwt.encode(req.body.login.password, '_o0OMd9#ud');
            if (encodedPassword == user.password) {
                res.status(202).send({
                    token: createToken(user)
                });
            } else {
                return res.status(401).send({
                    message: 'Invalid password'
                });
            }
        });
    }
}

function createToken(user) {
    var payload = {
        sub: user._id,
        name: user.displayName,
        iat: moment().unix(),
        exp: moment().add(2, 'hours').unix()
    };
    return jwt.encode(payload, '_o0OMd9#ud');
}
