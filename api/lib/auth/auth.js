'use strict';

var path = require('path'),
    errorHandler = require(path.resolve('./lib/errors.server.controller')),
    User = require('../users/user'),
    jwt = require('jwt-simple'),
    moment = require('moment');

module.exports = {
    register: function(req, res) {

        User.findOne({
            email: req.body.email
        }, function(err, existingUser) {

            if (existingUser)
                return res.status(409).send({
                    message: errorHandler.getErrorMessage('Email is already registered')
                });
            console.log(req.body);
            var user = new User(req.body);
            user.displayName = user.firstName + ' ' + user.lastName;

            user.save(function(err, result) {
                if (err) {
                    res.status(500).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                }
                res.status(200).send({
                    token: createToken(result)
                });
            })
        });
    },
    login: function(req, res) {
        User.findOne({
            email: req.body.email
        }, function(err, user) {

            if (!user)
                return res.status(401).send({
                    message: 'Email or Password invalid'
                });

            if (req.body.password == user.password) {
                res.send({
                    token: createToken(user)
                });
            } else {
                return res.status(401).send({
                    message: 'Invalid email and/or password'
                });
            }
        });
    },
    signout: function(req, res) {
        req.logout();
        res.redirect('/');
    }
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, '_o0OMd9#ud');
}