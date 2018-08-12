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

const savePost = (post, res, _id) => {
  if (_id) {
    Post.findOneAndUpdate({ _id }, { $set: post }, function(err, posts) {
      err ? console.log(err) : res.json(posts);
    });
  } else {
    //no ID => create new post
    const newPost = new Post(post);
    newPost.save(function(err, post) {
      if (err) return console.error(err);
      res.json(post);
    });
  }
};

router.post("/", upload.single("image_url"), function(req, res, next) {
  const newPost = req.body;
  newPost.author = req.user._id;

  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
      newPost.image_url = result.secure_url;
      savePost(newPost, res);
    });
  } else {
    savePost(newPost, res);
  }
});

router.get("/:id", function(req, res) {
  const _id = req.params.id;

  Post.findOne({ _id }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

router.put("/:id", upload.single("image_url"), function(req, res, next) {
  const post = req.body;
  post.author = req.user._id;

  const _id = req.params.id; //post ID

  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
      post.image_url = result.secure_url;
      savePost(post, res, _id);
    });
  } else {
    savePost(post, res, _id);
  }
});

router.delete("/:id", function(req, res) {
  const _id = req.params.id;

  Post.findOneAndRemove({ _id }, function(err, posts) {
    err ? console.log(err) : res.json(posts);
  });
});

module.exports = router;
