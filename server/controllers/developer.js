const Dev = require("../models/developer.js");
const { validationResult } = require('express-validator/check');

exports.index = (req, res) => {

    Dev.find({}, (err, developers) => {

        if (err) {
            res.json({
                status: "error",
                error: err.message
            });
            return;
        }

        res.json({
            status: "success",
            developers: developers
        });
    });

};

exports.store = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    Dev.findOne({email: req.body.email}, (err, developer) => {

        if (err) {

            return res.json({
                status: "error",
                error: err.message
            });
        }

        if (developer) {

            return res.json({
                status: "error",
                error: "Email already taken!"
            });
        }

        let newDeveloper = new Dev(req.body);

        newDeveloper.save((err, developer) => {
            if(err) {
                res.json({
                    status: "error",
                    error: err.message
                });
                return;
            }

            res.json({status: "success", message: "Developer successfully added!", newDeveloper });
        });
    });
};

exports.view = (req, res) => {

    Dev.findById(req.params.id, (err, developer) => {
        if(err) {
            res.json({
                status: "error",
                error: err.message
            });
            return;
        }

        res.json({status: "success", message: "Developer found!", developer });
    });
};

exports.delete = (req, res) => {

    Dev.deleteOne({_id : req.params.id}, (err, result) => {

        res.json({ status: "success", message: "Developer successfully deleted!", result });
    });
};

exports.update = (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    Dev.findById({_id: req.params.id}, (err, developer) => {
        if(err) {
            res.json({
                status: "error",
                error: err.message
            });
            return;
        }
        Object.assign(developer, req.body).save((err, developer) => {
            if(err) {
                res.json({
                    status: "error",
                    error: err.message
                });
                return;
            }

            res.json({ status: "success", message: 'Developer updated!', developer });
        });
    });
};

exports.getByRole = (req, res) => {
    Dev.find({role: req.params.role}, (err, developers) => {
        if (err) {
            res.json({
                status: "error",
                error: err.message
            });
            return;
        }

        res.json({
            status: "success",
            developers: developers
        });
    });
}