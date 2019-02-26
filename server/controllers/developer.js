const Dev = require("../models/developer.js");

exports.index = (req, res) => {

    Dev.find({}, (err, developers) => {

        if (err) {
            res.json({
                status: false,
                error: "An error occurred"
            });
            return;
        };

        res.json({
            status: true,
            developers: developers
        });
    });

};