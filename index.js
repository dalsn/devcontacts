const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const routes = require("./server/routes");

const SUCCESS = 200;

// Set up the express app
const app = express();
const config = require("./server/config");

// Log requests to the console.
app.use(logger("dev"));

// Parse incoming requests data
app.use(bodyParser.urlencoded({"extended": 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

routes(app)

// app.get("*", (req, res) => res.status(SUCCESS).send({
//     "message": "Developers's Contacts API",
// }));

mongoose.connect(config.db);

mongoose.connection.on('connected', function() {
	console.log("Connected to DB");
});

app.listen(config.port, function(err){
	if (err) throw err;
	console.log("Listening on port " + config.port);
});

module.exports = app;