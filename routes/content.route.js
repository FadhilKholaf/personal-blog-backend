const express = require('express')
const contentController = require('../controllers/content.controller')

const app = express()

app.get("/",contentController.getContents)
app.get("/:id",contentController.getContent)
app.post("/", contentController.createContent)
app.put("/:id",contentController.updateContent)
app.delete("/:id",contentController.deleteContent)

module.exports = app