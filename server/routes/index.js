const developer = require("../controllers/developer.js");

const routes = (app) => {

    app.post("/api/developer", [], developer.store);
    app.get("/api/developer", [], developer.index);
    app.get("/api/developer/:id", [], developer.view);
    app.delete("/api/developer/:id", [], developer.delete);
    app.put("/api/developer/:id", [], developer.update);
    app.get("/api/role/:role", [], developer.getByRole);
};

module.exports = routes;