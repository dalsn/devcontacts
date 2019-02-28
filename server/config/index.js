if (process.env.NODE_ENV !== 'production') {
	require('dotenv').load();
}

let config = {
	port: process.env.PORT || 3000
};

if (process.env.NODE_ENV === 'production') {
	config = {
		...config,
		db: process.env.DB || "mongodb://localhost/devContactDB"
	};
} else if(process.env.NODE_ENV === 'test') {
	config = {
		port: process.env.PORT || 3001,
		db: process.env.TEST_DB || "mongodb://localhost/devapi_test"
	};
} else {
	config = {
		...config,
		db: process.env.DB || "mongodb://localhost/devapi"
	};
}

module.exports = config;