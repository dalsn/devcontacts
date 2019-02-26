let sinon = require("sinon");
let chai = require("chai");
let mongoose = require("mongoose");
require("sinon-mongoose");

let expect = chai.expect;
let Dev = require("../../server/models/developer");

describe("Get all developers' contacts", () => {
	it("should return all developers' contacts", (done) => {
		let DevMock = sinon.mock(Dev);
		let expectedResult = {
			status: true,
			developer: []
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
