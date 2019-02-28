let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

let user = mongoose.model('User', UserSchema);

module.exports = user;