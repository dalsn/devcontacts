let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let DeveloperSchema = Schema({
	name: {
		type: String
	},
	role: {
		type: String
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

let DeveloperModel = mongoose.model('Developer', DeveloperSchema);

module.exports = DeveloperModel;