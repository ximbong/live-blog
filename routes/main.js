const express = require("express"),
  router = express.Router(),
  Post = require("../models/post"),
  Featured = require("../models/featured");

router.get("/", function(req, res) {
  const response = {};
  Post.find({})
    .sort({ _id: -1 })
    .limit(20)
    .exec(function(err, posts) {
      response.main = posts;
      Featured.find({})
        .limit(7)
        .exec(function(err, featured) {
          console.log(featured);
          response.featured = featured;
          res.json(response);
        });
    });
});

module.exports = router;
