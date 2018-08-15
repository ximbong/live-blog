const express = require("express"),
  router = express.Router(),
  Post = require("../models/post"),
  Featured = require("../models/featured");

router.put("/:id", function(req, res) {
  const post_id = req.params.id;

  const featuredPost = new Featured({
    data: post_id
  });

  featuredPost.save(function(err, post) {
    if (err) return console.error(err);
    res.json(post);
  });
});

router.get("/limit/:quantity", function(req, res) {
  const quantity = parseInt(req.params.quantity, 10);

  console.log(quantity);

  Featured.find({})
    .limit(quantity)
    .populate("data")
    .exec(function(err, posts) {
      const postsData = posts.map(e => e.data);

      res.json(postsData);
    });
});

router.get("/", function(req, res) {
  Featured.find({})
    .populate("data")
    .exec(function(err, posts) {
      const postsData = posts.map(e => e.data);

      err ? console.log(err) : res.json(postsData);
    });
});

module.exports = router;
