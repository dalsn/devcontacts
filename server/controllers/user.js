const User = require("../models/user.js");
const config = require("../config/index.js");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator/check');

exports.login = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    User.findOne({email: req.body.email}, (err, user) => {

        if (err) {

            return res.json({
                status: "error",
                error: err.message
            });
        }

        if (!user) {

            return res.json({
                status: "error",
                error: "User not found!"
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {

            return res.json({
                status: "error",
                auth: false,
                error: "Invalid Password!"
            });
        }

        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 7200
        });

        res.json({
            status: "success",
            auth: true,
            jwt: token
        });

    });

};

exports.store = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    User.findOne({email: req.body.email}, (err, user) => {

        if (err) {

            return res.json({
                status: "error",
                error: err.message
            });
        }

        if (user) {

            return res.json({
                status: "error",
                error: "Email already taken!"
            });
        }

        let newUser = new User({
            email: req.body.email,
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
        });

        newUser.save((err, user) => {
            if(err) {
                res.json({
                    status: "error",
                    error: err.message
                });
                return;
            }

            return res.json({ status: "success", message: "Successful signup!"});
        });
    });
};