const express = require("express"),
  router = express.Router(),
  Post = require("../models/post");

router.get("/", function(req, res) {
  Post.find({})
    .sort({ views: -1 })
    .limit(5)
    .exec(function(err, posts) {
      res.json(posts);
    });
});

module.exports = router;
