const Dev = require("../models/developer.js");
const { check } = require('express-validator/check');

let validation = {
	developer: {
		save: [
			check('name').exists().isLength({ min: 6 }),
			check('email').exists().isEmail(),
			check('phone').optional().isLength({min: 11, max: 11}),
			check('role').exists().custom(role => {
				switch (role.toLowerCase()) {
					case "fullstack developer":
					case "frontend developer":
					case "backend developer":
						return true;
						break;
					default:
						return Promise.reject("Role can only be either Fullstack Developer, Backend Developer or Frontend Developer");
				}
			})
		],
		update: [
			check('name').optional().isLength({ min: 6 }),
			check('email').optional().isEmail(),
			check('phone').optional().isLength({min: 11, max: 11}),
			check('role').optional().custom(role => {
				switch (role.toLowerCase()) {
					case "fullstack developer":
					case "frontend developer":
					case "backend developer":
						return true;
						break;
					default:
						return Promise.reject("Role can only be either Fullstack Developer, Backend Developer or Frontend Developer");
				}
			})
		]
	}
};

module.exports = validation;