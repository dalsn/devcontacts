const routes = function(app) {

    app.post("/api/developer", [], contact.store);
    app.get("/api/developer", [], contact.index);
    app.get("/api/developer/:developerId", [], contact.view);
    app.delete("/api/developer/:developerId", [], contact.delete);
    app.patch("/api/developer/:developerId", [], contact.update);
};

module.exports = routes;