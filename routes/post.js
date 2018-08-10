const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  cloudinary = require("cloudinary"),
  key = require("../config/key"),
  Post = require("../models/post");

//cloudinary config here
cloudinary.config({
  cloud_name: "ximbong91023",
  api_key: key.api_key,
  api_secret: key.api_secret
});

const upload = multer({ dest: "../tmp/uploads" });

const savePost = (title, description, content, category, image_url) => {
  const post = {
    title,
    description,
    content,
    category,
    image_url
  };

  const newPost = new Post(post);
  newPost.save(function(err, post) {
    if (err) return console.error(err);
    res.json(post);
  });
};

router.post("/", upload.single("image_url"), function(req, res, next) {
  const { title, description, content, category } = req.body;
  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
      const image_url = result.secure_url;
      savePost(title, description, content, category, image_url);
    });
  } else {
    savePost(title, description, content, category, image_url);
  }
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
