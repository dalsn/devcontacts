process.env.NODE_ENV = 'test'

let mongoose = require("mongoose");
let Dev = require("../../server/models/developer");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../index.js');
let should = chai.should();

chai.use(chaiHttp);

describe('DeveloperContact', () => {

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
				email: "dalsdnjidda@gmail.com",
				phone: "08132842499"
			};
			chai.request(server)
			.post('/api/developer')
			.send(developer)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('message').eql('Developer successfully added!');
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
			let developer = new Dev({
				name: "Saleema Dalhatu",
				role: "Frontend Developer",
				email: "dalsnjidda@gmail.com",
				phone: "09023084045"
			});
			developer.save((err, developer) => {
				chai.request(server)
				.get('/api/developer/' + developer.id)
				.send(developer)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('name');
					res.body.should.have.property('email');
					res.body.should.have.property('phone');
					res.body.should.have.property('role');
					res.body.should.have.property('_id').eql(developer.id);
					done();
				});
			});
		});
	});

	describe('/GET/:role developer', () => {
		it('it should GET developers by the given role', (done) => {
			let developer = new Dev({
				name: "Saleema Dalhatu",
				role: "Frontend Developer",
				email: "dalsnjidda@gmail.com",
				phone: "09023084045"
			});
			developer.save((err, developer) => {
				chai.request(server)
				.get('/api/role/' + developer.role)
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
	});

	describe('/PUT/:id developer', () => {
		it('it should UPDATE a developer given the id', (done) => {
			let developer = new Dev({
				name: "Zainab Dalhatu",
				role: "Backend Developer",
				email: "dals.njidda@gmail.com",
				phone: "08136545311"
			});
			developer.save((err, developer) => {
				chai.request(server)
				.put('/api/developer/' + developer.id)
				.send({
					name: "Zainab Dalhatu",
					role: "Fullstack Developer",
					email: "dals.njidda@gmail.com",
					phone: "08037164861"
				})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Developer updated!');
					res.body.developer.should.have.property('role').eql("Fullstack Developer");
					res.body.developer.should.have.property('phone').eql("08037164861");
					done();
				});
			});
		});
	});

	describe('/DELETE/:id developer', () => {
		it('it should DELETE a developer given the id', (done) => {
			let developer = new Dev({
				name: "Zainab Dalhatu",
				role: "Backend Developer",
				email: "dals.njidda@gmail.com",
				phone: "08136545311"
			});
			developer.save((err, developer) => {
				chai.request(server)
				.delete('/api/developer/' + developer.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('message').eql('Developer successfully deleted!');
					res.body.result.should.have.property('ok').eql(1);
					res.body.result.should.have.property('n').eql(1);
					done();
				});
			});
		});
	});
});