const Dev = require("../models/developer.js");

exports.index = (req, res) => {

    Dev.find({}, (err, developers) => {

        if (err) {
            res.json({
                status: false,
                error: err.message
            });
            return;
        }

        res.json({
            status: true,
            developers: developers
        });
    });

};

exports.store = (req, res) => {

    let developer = new Dev(req.body);

    developer.save((err, developer) => {
        if(err) {
            res.json({
                status: false,
                error: err.message
            });
            return;
        }

        res.json({message: "Developer successfully added!", developer });
    });
};

exports.view = (req, res) => {

    Dev.findById(req.params.id, (err, developer) => {
        if(err) {
            res.json({
                status: false,
                error: err.message
            });
            return;
        }

        res.json(developer);
    });
};

exports.delete = (req, res) => {

    Dev.deleteOne({_id : req.params.id}, (err, result) => {

        res.json({ message: "Developer successfully deleted!", result });
    });
};

exports.update = (req, res) => {

    Dev.findById({_id: req.params.id}, (err, developer) => {
        if(err) {
            res.json({
                status: false,
                error: err.message
            });
            return;
        }
        Object.assign(developer, req.body).save((err, developer) => {
            if(err) {
                res.json({
                    status: false,
                    error: err.message
                });
                return;
            }

            res.json({ message: 'Developer updated!', developer });
        });
    });
};

exports.getByRole = (req, res) => {
    Dev.find({role: req.params.role}, (err, developers) => {
        if (err) {
            res.json({
                status: false,
                error: err.message
            });
            return;
        }

        res.json({
            status: true,
            developers: developers
        });
    });
}