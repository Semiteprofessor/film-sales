require("dotenv").config();

const express = require("express");

const app = express();
const displayRoutes = require("express-routemap");
const sequelize = require("./config/db.config");

const port = process.env.PORT || 8080;

const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());

const userRoutes = require("./routes/user.route");
const movieRoutes = require("./routes/movie.route");
const walletRoutes = require("./routes/wallet.route");

// Endpoints
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/movie", movieRoutes);
app.use("/api/v1/wallet", walletRoutes);

sequelize
  .authenticate()
  .then(() => {
    app.listen(port);
    console.log("Database Connection has been established successfully.");
    displayRoutes(app);
  })
  .catch();
