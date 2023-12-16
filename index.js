require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contentRoutes = require("./routes/content.route");
const userRoutes = require("./routes/user.route");
const PORT = process.env.PORT || 8080;

// express app
const app = express();

// middlewareee
app.use(express.json());
app.use(cors());

// routes
app.use("/api/content", contentRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(PORT, () => {
      console.log("listening for requests on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
