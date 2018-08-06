const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/user");

//handling user sign up
router.post("/", function(req, res) {
  const { username, password } = req.body;

  User.register(new User({ username }), password, function(err, user) {
    if (err) {
      console.log(err);
      res.send(err.message);
    }
    passport.authenticate("local")(req, res, function() {
      res.send(true);
    });
  });
});

module.exports = router;
