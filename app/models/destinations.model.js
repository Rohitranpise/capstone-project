module.exports = (sequelize, Sequelize) => {
    let Destination = sequelize.define("destinations", {
        dest_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        dest_name: {
            type: Sequelize.STRING,
            allownull: false
        },
        dest_overview: {
            type: Sequelize.TEXT,
            allownull: false
        },
        dest_tips: {
            type: Sequelize.TEXT,
            allownull: false
        },
        dest_url: {
            type: Sequelize.TEXT,
            allownull: false
        },
        dest_tag: {
            type: Sequelize.STRING,
            allownull: false
        }
    });
    return Destination;
}