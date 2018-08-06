const express = require("express"),
  router = express.Router(),
  Post = require("../models/post");

router.put("/:id", function(req, res) {
  const _id = req.params.id;

  Post.findOneAndUpdate({ _id }, { featured: true }, function(err, result) {
    err ? console.log(err) : res.json(result);
  });
});

router.get("/", function(req, res) {
  const _id = req.params.id;

  Post.find({ featured: true }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

module.exports = router;
