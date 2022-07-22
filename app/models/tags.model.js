module.exports = (sequelize, Sequelize) => {
    let Tag = sequelize.define("tag", {
        name: {
            type: Sequelize.STRING
        }
    });
    return Tag;
}