var express = require('express');
var router = express.Router();
var db = require("../models");
var helper = require("../helpers/todos")

router.route("/")
.get(helper.getTodos)
.post(helper.createTodo)

router.route("/:todoId")
.get(helper.getTodo)
.put(helper.updateTodo)
.delete(helper.deleteTodo)


module.exports = router;