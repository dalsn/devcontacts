const config = {
	port: process.env.PORT || 3000,
	db: process.env.MONGODB_URI || "mongodb://localhost/devapi",
	test_port: 3001,
	test_db: "mongodb://localhost/devapi_test"
};

module.exports = config;