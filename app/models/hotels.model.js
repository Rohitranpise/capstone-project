require("../models/destinations.model")
module.exports = (sequelize, Sequelize) => {
    let Hotel = sequelize.define("hotels", {
        hotel_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dest_id: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        hotel_name: {
            type: Sequelize.STRING,
            allownull: false
        },
        hotel_overview: {
            type: Sequelize.TEXT,
            allownull: false
        },
        hotel_location: {
            type: Sequelize.STRING,
            allownull: false
        },
        hotel_url: {
            type: Sequelize.TEXT,
            allownull: false
        }
    });
    return Hotel;
}