module.exports = app => {
    const bookings = require("../controllers/bookings.controller");

    var router = require("express").Router();

    router.post("/", bookings.create);

    router.get("/", bookings.findAll)

    router.delete("/:id", bookings.delete)

    app.use("/api/bookings", router)
}