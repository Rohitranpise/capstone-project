module.exports = app => {
    const hotels = require("../controllers/hotels.controller")

    var router = require("express").Router();

    router.post("/", hotels.create);

    router.get("/", hotels.findAll);

    router.get("/:id", hotels.findOne);

    router.put("/:id", hotels.update);

    router.delete("/:id", hotels.delete);

    app.use("/api/hotels", router);

}