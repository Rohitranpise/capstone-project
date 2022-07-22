const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.destinations = require("./destinations.model")(sequelize, Sequelize);
db.hotels = require("./hotels.model")(sequelize, Sequelize);
db.bookings = require("./bookings.model")(sequelize, Sequelize);
db.tags = require("../models/tags.model")(sequelize, Sequelize);
// db.destTags = require("../models/destTags.model")(sequelize, Sequelize);


//many to many relation between users and roles
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});
db.ROLES = ["user", "admin", "moderator"];



//one to many relation between destination and hotels
db.destinations.hasMany(db.hotels);
db.hotels.belongsTo(db.destinations, {
    foreignKey: "dest_id"
})

//many to many relation between destinations and tags
//sequelize automatically creates a third (junction table) .. "dest_tag"
//sequelize will add "dest_id" and "tag_id" columns into new table.
db.destinations.belongsToMany(db.tags, {
    through: "dest_tag",
    foreignKey: "dest_id",
    otherKey: "tag_id"
});
db.tags.belongsToMany(db.destinations, {
    through: "dest_tag",
    foreignKey: "tag_id",
    otherKey: "dest_id"
})

//one to many relation between 
db.bookings.belongsTo(db.user, {
    foreignKey: "userId"
});
db.user.hasMany(db.bookings);

//one to many
db.bookings.belongsTo(db.hotels, {
    foreignKey: "hotel_id"
}); 
db.hotels.hasMany(db.bookings);


db.TAGS = ["mountains_lover", "history_lover", "religious", "beach_lover"]


module.exports = db;