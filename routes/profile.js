const express = require("express"),
  router = express.Router(),
  Post = require("../models/post");

router.get("/", function(req, res) {
  Post.find({ author_id: "0" }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

module.exports = router;
