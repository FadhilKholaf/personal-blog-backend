const express = require("express");
const UserController = require("../controllers/user.controller");

const app = express();

app.get("/", UserController.getUsers);
app.get("/login", UserController.logIn);
app.post("/signup", UserController.signUp);
app.put("/update/:id", UserController.updateUser);
app.delete("/delete/:id", UserController.deleteUser);

module.exports = app;
