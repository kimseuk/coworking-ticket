var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/login')
    .get(function(req, res, next) {
        res.render('login', { title: 'Login'});
    })
    .post(passport.authenticate('local', {
        failureRedirect: '/login'
    }), function (req, res) {
        res.redirect('/');
    });

router.route('/join')
    .get(function(req, res, next) {
        res.render('join', { title: 'Join'});
    })
    .post(function(req, res, next) {
        req.checkBody('name', 'invalid name').notEmpty();
        req.checkBody('email', 'invalid email').isEmail();
        req.checkBody('password', 'invalid password').notEmpty();
        req.checkBody('password', 'invalid password confirmation').equals(req.body.confirmPassword).notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('register', {
                name: req.body.name,
                email: req.body.email,
                errorMessages: errors
            });
        } else {
            var user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.setPassword(req.body.password);
            user.save(function (err) {
                if (err) {
                    res.render('join', {errorMessages: err});
                } else {
                    res.redirect('/login');
                }
            })
        }
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
