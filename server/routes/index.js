const developer = require("../controllers/developer.js");
const user = require("../controllers/user.js");
const validator = require("../models/validation.js");
const authJwt = require("./verifyJwt.js");

const routes = (app) => {

    app.post("/api/developer", [validator.developer.save, authJwt.verifyToken], developer.store);
    app.get("/api/developer", [], developer.index);
    app.get("/api/developer/:id", [], developer.view);
    app.delete("/api/developer/:id", [authJwt.verifyToken], developer.delete);
    app.put("/api/developer/:id", [validator.developer.update, authJwt.verifyToken], developer.update);
    app.get("/api/role/:role", [], developer.getByRole);

    app.post("/api/user", [validator.user.save], user.store);
    app.post("/api/login", [validator.user.auth], user.login);
};

module.exports = routes;