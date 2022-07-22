const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome to login application" })
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/destinations.routes')(app);
require('./app/routes/hotels.routes')(app);
require('./app/routes/bookings.routes')(app);

const db = require("./app/models");
const Role = db.role;
const Tag = db.tags;
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Db');
  initial();
  update();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}


function update() {
  Tag.create({
    id: 1,
    name: "mountains_lover"
  });
  Tag.create({
    id: 2,
    name: "history_lover"
  });
  Tag.create({
    id: 3,
    name: "religious"
  });
  Tag.create({
    id: 4,
    name: "beach_lover"
  });
}
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`app is running on the ${PORT}`)
})