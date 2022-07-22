module.exports = app =>{
    const destinations = require("../controllers/destinations.controller")

    var router = require("express").Router();

    router.post("/", destinations.create);

    router.get("/", destinations.findAll);

    router.get("/?dest_name=Goa", destinations.findAllByName);

    router.get("/?dest_tag=mountains_lover", destinations.findAllByTag);

    router.get("/:id", destinations.findOne)

    router.put("/:id", destinations.update);

    router.delete("/:id", destinations.delete)

    app.use("/api/destinations", router);
}