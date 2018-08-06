const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/user");

router.get("/", function(req, res) {
  res.send(true);
});

module.exports = router;
