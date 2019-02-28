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
	},
	user: {
		save: [
			check('name').exists().withMessage("Name field is required")
			.isLength({ min: 6 }).withMessage("Name is too short"),
			check('email').exists().withMessage("Email field is required")
			.isEmail().withMessage("Invalid email"),
			check('password').exists().withMessage("Password field is required")
			.isLength({min: 8}).withMessage("Password must be 8 characters or more")
		],
		auth: [
			check('email').exists().withMessage("Email field is required")
			.isEmail().withMessage("Invalid email"),
			check('password').exists().withMessage("Password field is required")
		]
	}
};

module.exports = validation;