const jwt = require("jsonwebtoken");
const config = require("../config/index.js");
const User = require("../models/user.js");

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    if (!token) {

        return res.json({
            status: "error",
            auth: false,
            message: "No token provided."
        });

    }

    jwt.verify(token, config.secret, (err, decoded) => {

        if (err) {

            return res.json({
                status: "error",
                auth: false,
                message: `Failed to Authenticate. Error -> ${err.message}`
            });

        }

        next();

    });

};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;