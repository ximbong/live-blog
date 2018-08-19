const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/user");

//handling user sign up
router.get("/", function(req, res) {
  req.logout();
  res.json({
    username: req.user || null
  });
});

module.exports = router;
