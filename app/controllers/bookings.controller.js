const db = require("../models")
const Booking = db.bookings;
const Op = db.Sequelize.Op;


//post a booking by book_by
exports.create = (req, res) => {
    if (!req.body.book_by || !req.body.userId || !req.body.dest_id || !req.body.hotel_id) {
        res.status(400).send({
            message: "content can not be empty"
        });
        return;
    }

    //create a booking
    const booking = {
        book_by: req.body.book_by,
        userId: req.body.userId,
        dest_id: req.body.dest_id,
        hotel_id: req.body.hotel_id
    };

    //save the booking in database
    Booking.create(booking)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
}

//get all bookings:
exports.findAll = (req, res) => {
    const book_by = req.query.book_by;
    var condition = book_by ? { dest_name: { [Op.iLike]: `%${book_by}%` } } : null;
    Booking.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Bookings."
            });
        });
};

//delete booking by id
exports.delete = (req, res) => {
    const id = req.params.id;
    Booking.destroy({
        where: { book_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Booking was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Booking with id=" + id
            });
        });
};