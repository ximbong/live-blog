const express = require("express"),
  passport = require("passport"),
  router = express.Router(),
  User = require("../models/user");

//handling user login

router.post("/", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    const loginSuccess = !info; //login success => info is undefined.

    if (err) {
      return next(err);
    }
    if (!user) {
      return;
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(loginSuccess);
    });
  })(req, res, next);
});

module.exports = router;
