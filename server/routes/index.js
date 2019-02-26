const developer = require("../controllers/developer.js");

const routes = (app) => {

    // app.post("/api/developer", [], developer.store);
    app.get("/api/developer", [], developer.index);
    // app.get("/api/developer/:developerId", [], developer.view);
    // app.delete("/api/developer/:developerId", [], developer.delete);
    // app.patch("/api/developer/:developerId", [], developer.update);
};

module.exports = routes;