var express = require('express');
var router = express.Router();
var query = require("../mysql/index");

router.post('login', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.username;
})