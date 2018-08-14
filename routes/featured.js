const express = require("express"),
  router = express.Router(),
  Post = require("../models/post"),
  Featured = require("../models/featured");

router.put("/:id", function(req, res) {
  const _id = req.params.id;

  Post.findByIdAndUpdate(_id, { featured: true }, function(err, result) {
    err ? console.log(err) : res.json(result);
  });
});

router.get("/", function(req, res) {
  Featured.find({}, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

module.exports = router;
