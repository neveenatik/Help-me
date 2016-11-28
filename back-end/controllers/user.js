/*var User = require('../models/user');

module.exports = {
    getAll: function (req, res) {
        User.find({}).populate('user', '-pwd').exec(function (err, users) {
            res.send(users);
        })
    },
    post: function (req, res) {
        console.log(req.body, req.user);
        
        req.body.user = req.user;
        
        var user = new User(req.body);

        user.save();

        res.status(200);
    }
}*/