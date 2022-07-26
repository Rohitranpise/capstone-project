const express = require("express");
const bodyParser = require("body-parser")
/*it is nodejs middleware, 
Parse incoming request bodies in a middleware before your handlers,
 available under the req.body property.*/
const cors = require("cors");
/*CORS stands for Cross-Origin Resource Sharing. 
It allows us to relax the security applied to an API*/
require('dotenv').config()
const app = express();
app.set('view engine', 'ejs')
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json())// it parses incoming requests with json payloads.

app.use(bodyParser.urlencoded({ extended: true }));// it parses incoming requests with relencoded payload.

app.get("/", (req, res) => {
  res.json({ message: "welcome to travels application" })
})

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/destinations.routes')(app);
require('./app/routes/hotels.routes')(app);
require('./app/routes/bookings.routes')(app);

const db = require("./app/models");
const Role = db.role;
const Tag = db.tags;
db.sequelize.sync({force : true}).then(() => {
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