const db = require("../models")
const Hotel = db.hotels;
const Op = db.Sequelize.Op;

//post a hotel
exports.create = (req, res) => {
    if (!req.body.hotel_name) {
        res.status(400).send({
            message: "content can not be empty"
        });
        return;
    }

    //create a hotel
    const hotel = {
        dest_id: req.body.dest_id,
        hotel_name: req.body.hotel_name,
        hotel_overview: req.body.hotel_overview,
        hotel_location: req.body.hotel_location,
        hotel_url: req.body.hotel_url
    };
    //save the hotel in database
    Hotel.create(hotel)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured"
            })
        })
};


//getting all hotels
exports.findAll = (req, res) => {
    const hotel_name = req.query.hotel_name;
    var condition = hotel_name ? { hotel_name: { [Op.iLike]: `%${hotel_name}%` } } : null;
    Hotel.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while retriving hotels."
            });
        });
};

//find a hotel by hotel_id.
exports.findOne = (req, res) => {
    const id = req.params.id;
    Hotel.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `cannot find Hotel with id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error retriving Hotel with id =" + id
            })
        })
};


//update a hotel by hotel_id.
exports.update = (req, res) => {
    const id = req.params.id;
    Hotel.update(req.body, {
        where: { hotel_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Hotel was updated successfully!"
                });
            } else {
                res.send({
                    message: `cannot update Hotel with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Hotel with id =" + id
            });
        });
};


//delete a hotel by hootel_id
exports.delete = (req, res) => {
    const id = req.params.id;
    Hotel.destroy({
        where: { hotel_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Hotel was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Hotel with id=${id}. Maybe hotel was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Hotel with id=" + id
            });
        });
};