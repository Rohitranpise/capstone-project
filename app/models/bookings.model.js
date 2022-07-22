
module.exports = (sequelize, Sequelize) => {
    let Booking = sequelize.define("bookings", {
        book_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allownull: false,
        },
        hotel_id: {
            type: Sequelize.INTEGER,
            allownull: false
        },
        book_by: {
            type: Sequelize.STRING,
            allownull: false
        }
    });
    return Booking;
}