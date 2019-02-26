let should = require("should");
let sinon = require("sinon");
let chai = require("chai");
let expect = chai.expect;

let mongoose = require("mongoose");
require("sinon-mongoose");

let Dev = require("../../server/models/developer");

describe("Get all developers' contacts", () => {
	it("should return all developers' contacts", (done) => {
		let DevMock = sinon.mock(Dev);
		let expectedResult = {
			status: true,
			developers: []
		};
		DevMock.expects('find').yields(null, expectedResult);
		Dev.find((err, result) => {
			DevMock.verify();
			DevMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});

	it("should return error", (done) => {
		let DevMock = sinon.mock(Dev);
		let expectedResult = {
			status: false,
			error: "An error occurred"
		};
		DevMock.expects('find').yields(expectedResult, null);
		Dev.find((err, result) => {
			DevMock.verify();
			DevMock.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Create new developer contact", () => {
	it("should create a developer contact", (done) => {
		let DevMock = sinon.mock(new Dev({
			name: "Dalhatu Njidda",
			type: "Backend Developer",
			email: "dalsdnjidda@gmail.com",
			phone: "08132842499"
		}));

		let developer = DevMock.object;
		let expectedResult = { status: true };
		DevMock.expects('save').yields(null, expectedResult);
		developer.save((err, result) => {
			DevMock.verify();
			DevMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});

	it("should return error, if not created", (done) => {
		let DevMock = sinon.mock(new Dev({
			name: "Dalhatu Njidda",
			type: "Backend Developer",
			email: "dalsdnjidda@gmail.com",
			phone: "08132842499"
		}));

		let developer = DevMock.object;
		let expectedResult = { status: false };
		DevMock.expects('save').yields(expectedResult, null);
		developer.save((err, result) => {
			DevMock.verify();
			DevMock.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Update a developer contact by id", () => {
	it("should update a developer contact by id", (done) => {
		let DevMock = sinon.mock(new Dev({ role: "Frontend Developer" }));
		let developer = DevMock.object;
		let expectedResult = { status: true };
		DevMock.expects('save').withArgs({_id: 1}).yields(null, expectedResult);
		developer.save(function (err, result) {
			DevMock.verify();
			DevMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});

	it("should return error if update action is failed", (done) => {
		let DevMock = sinon.mock(new Dev({ role: "Frontend Developer"}));
		let developer = DevMock.object;
		let expectedResult = { status: false };
		DevMock.expects('save').withArgs({_id: 1}).yields(expectedResult, null);
		developer.save((err, result) => {
			DevMock.verify();
			DevMock.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Delete a developer by id", () => {
	it("should delete a developer by id", (done) => {
		var DevMock = sinon.mock(Dev);
		var expectedResult = { status: true };
		DevMock.expects('remove').withArgs({_id: 1}).yields(null, expectedResult);
		Dev.remove({_id: 1}, (err, result) => {
			DevMock.verify();
			DevMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});

	it("should return error if delete action failed", function(done){
		var DevMock = sinon.mock(Dev);
		var expectedResult = { status: false };
		DevMock.expects('remove').withArgs({_id: 1}).yields(expectedResult, null);
		Dev.remove({_id: 1}, function (err, result) {
			DevMock.verify();
			DevMock.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});