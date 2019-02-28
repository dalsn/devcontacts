let mongoose = require('mongoose').set('useCreateIndex', true);
let Schema = mongoose.Schema;

let DeveloperSchema = Schema({
	name: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	phone: {
		type: String,
		default: null
	},
	created: {
		type: Date,
		default: Date.now
	}
});

let developer = mongoose.model('Developer', DeveloperSchema);

module.exports = developer;