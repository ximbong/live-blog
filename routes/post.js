const express = require("express"),
  router = express.Router(),
  Post = require("../models/post");

router.post("/", function(req, res) {
  const post = req.body;
  Post.create(post, function(err, post) {
    err ? console.log(err) : res.json(post);
  });
});

router.get("/:id", function(req, res) {
  const _id = req.params.id;

  Post.findOne({ _id }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

router.put("/:id", function(req, res) {
  const _id = req.params.id;
  const post = req.body;

  Post.findOneAndUpdate({ _id }, { $set: post }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

router.delete("/:id", function(req, res) {
  const _id = req.params.id;

  Post.findOneAndRemove({ _id }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

module.exports = router;
