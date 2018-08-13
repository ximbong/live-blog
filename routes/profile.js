const express = require("express"),
  router = express.Router(),
  User = require("../models/user");

router.get("/", function(req, res) {
  const userID = req.user._id;

  User.findById(userID)
    .populate("posts")
    .exec(function(err, user) {
      if (err) return console.log(err);
      res.json(user.posts);
    });
});

module.exports = router;
