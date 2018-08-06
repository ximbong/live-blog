const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/user");

//handling user sign up

router.post("/", function(req, res) {
  req.logout();
});

module.exports = router;
