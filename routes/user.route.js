const express = require("express");
const UserController = require("../controllers/user.controller");

const app = express();

app.get("/", UserController.getUsers);
app.get("/login", UserController.logIn);
app.post("/signup", UserController.signUp);
app.put("/:id", UserController.updateUser);
app.delete("/:id", UserController.deleteUser);

module.exports = app;
