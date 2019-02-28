process.env.NODE_ENV = 'test'

let mongoose = require("mongoose").set('useCreateIndex', true).set('debug', true);
let Dev = require("../../server/models/developer");
let User = require("../../server/models/user");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index.js');
let should = chai.should();
const bcrypt = require("bcrypt-nodejs");

chai.use(chaiHttp);

describe('DeveloperContact', () => {

	var token = null;
	let password = "password"

	before(function(done) {
		let user = new User({
			name: "Dalhatu Njidda",
			email: "test@example.com",
			password: bcrypt.hashSync(password, bcrypt.genSaltSync(8))
		});

		user.save((err, userObj) => {
			if (err)
				done();
			let credential = { email: userObj.email, password: password };
			chai.request(server)
			.post('/api/login')
			.send(credential)
			.end(function(err, res) {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql('success');
				res.body.should.have.property('jwt');
				token = res.body.jwt;
				done();
			});
		});
	});

	describe('/GET developer', () => {
		it('it should GET all the developers', (done) => {
			chai.request(server)
			.get('/api/developer')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status');
				res.body.should.have.property('developers');
				res.body.developers.should.be.a('array');
				done();
			});
		});
	});

	describe('/POST developer', () => {
		it('it should POST a developer ', (done) => {
			let developer = {
				name: "Dalhatu Njidda",
				role: "Backend Developer",
				email: "dalsddnjidda@gmail.com",
				phone: "08132842499"
			};
			chai.request(server)
			.post('/api/developer')
			.set('x-access-token', token)
			.send(developer)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('status').eql('success');
				res.body.should.have.property('developer');
				res.body.developer.should.have.property('name');
				res.body.developer.should.have.property('email');
				res.body.developer.should.have.property('phone');
				res.body.developer.should.have.property('role');
				done();
			});
		});
	});

	describe('/GET/:id developer', () => {
		it('it should GET a developer by the given id', (done) => {
			let dev = new Dev({
				name: "Saleema Dalhatu",
				role: "Frontend Developer",
				email: "dalsnjiddah@gmail.com",
				phone: "09023084045"
			});
			dev.save((err, developer) => {
				chai.request(server)
				.get('/api/developer/' + developer.id)
				.send(developer)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('developer');
					res.body.developer.should.have.property('name');
					res.body.developer.should.have.property('email');
					res.body.developer.should.have.property('phone');
					res.body.developer.should.have.property('role');
					res.body.developer.should.have.property('_id').eql(developer.id);
					done();
				});
			});
		});
	});

	describe('/GET/:role developer', () => {
		it('it should GET developers by the given role', (done) => {
			let dev = new Dev({
				name: "Saleema Dalhatu",
				role: "Frontend Developer",
				email: "dalsnjidda@gmail.com",
				phone: "09023084045"
			});
			dev.save((err, developer) => {
				console.log(err);
				chai.request(server)
				.get('/api/role/' + developer.role)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.should.have.property('developers');
					res.body.developers.should.be.a('array');
					done();
				});
			});
		});
	});

	describe('/PUT/:id developer', () => {
		it('it should UPDATE a developer given the id', (done) => {
			let dev = new Dev({
				name: "Zainab Dalhatu",
				role: "Backend Developer",
				email: "dals.njidda@gmail.com",
				phone: "08136545311"
			});
			dev.save((err, developer) => {
				chai.request(server)
				.put('/api/developer/' + developer.id)
				.set('x-access-token', token)
				.send({
					name: "Zainabu Sagir",
					role: "Fullstack Developer",
					email: "dalsfnjidda@gmail.com",
					phone: "08037164861"
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.developer.should.have.property('role').eql("Fullstack Developer");
					res.body.developer.should.have.property('phone').eql("08037164861");
					done();
				});
			});
		});
	});

	describe('/DELETE/:id developer', () => {
		it('it should DELETE a developer given the id', (done) => {
			let dev = new Dev({
				name: "Zainab Dalhatu",
				role: "Backend Developer",
				email: "dalsdnjidda@gmail.com",
				phone: "08136545311"
			});
			dev.save((err, developer) => {
				console.log(err);
				chai.request(server)
				.delete('/api/developer/' + developer.id)
				.set('x-access-token', token)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status').eql('success');
					res.body.result.should.have.property('ok').eql(1);
					res.body.result.should.have.property('n').eql(1);
					done();
				});
			});
		});
	});

	after(function (done) {
		console.log('Deleting test database');
		mongoose.connection.db.dropDatabase(done);
	});
});