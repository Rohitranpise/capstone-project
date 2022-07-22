const { tags, destinations } = require("../models");
const db = require("../models")
const Destination = db.destinations;
const Tags = db.tags
const TAGS = db.TAGS
const Op = db.Sequelize.Op;

//post a destination
exports.create = (req, res) => {
    if (!req.body.dest_name) {
        res.status(400).send({
            message: "content can not be empty!"
        });
        return;
    }

    var destination = {
        dest_name: req.body.dest_name,
        dest_overview: req.body.dest_overview,
        dest_tips: req.body.dest_tips,
        dest_url: req.body.dest_url,
        dest_tag: req.body.dest_tag
    };
    Destination.create(destination)
        .then(destination => {
            if (req.body.dest_tag) {
                if (TAGS.includes(req.body.dest_tag)) {
                    return res.send(destination);
                } else {
                    res.status(400).send('error')
                }
            }
        });
};

//find one destination by that name
exports.findAllByName = (req, res) => {
    const dest_name = req.query.dest_name;
    var condition = dest_name ? { dest_name: { [Op.iLike]: `%${dest_name}%` } } : null;
    Destination.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while retriving Destination."
            });
        });
};

//find by tag name
exports.findAllByTag = (req, res) => {
    const dest_tag = req.query.dest_tag;
    var condition = dest_tag ? { dest_tag: { [Op.iLike]: `%${dest_tag}%` } } : null;
    Destination.findAll({ where: condition })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "some error occurred while retriving Destination."
            });
        });
};


//get one destination by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Destination.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `cannot find Destination with id = ${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error retriving Destination with id =" + id
            })
        })
}

//get all destinations
exports.findAll = (req, res) => {
    const dest_name = req.query.dest_name;
    var condition = dest_name ? { dest_name: { [Op.iLike]: `%${dest_name}%` } } : null;
    Destination.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Destinations."
            });
        });
};

//updating a destination
exports.update = (req, res) => {
    const id = req.params.id;
    Destination.update(req.body, {
        where: { dest_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Destination was updated successfully!"
                });
            } else {
                res.send({
                    message: `cannot update Destination with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Destination with id =" + id
            });
        });
};

//deleting a destination..
exports.delete = (req, res) => {
    const id = req.params.id;
    Destination.destroy({
        where: { dest_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: " Destination was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Destination with id=${id}. Maybe destination was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Destination with id=" + id
            });
        });
};
