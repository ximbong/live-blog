const express = require("express"),
  router = express.Router(),
  Post = require("../models/post");

router.get("/:category", function(req, res) {
  const category = req.params.category;

  Post.find({ category }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

module.exports = router;
