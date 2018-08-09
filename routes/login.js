const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/user");

//handling user login
router.post("/", passport.authenticate("local"), function(req, res, next) {
  res.send(true);
});

module.exports = router;
