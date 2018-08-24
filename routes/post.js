const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  cloudinary = require("cloudinary"),
  mongoose = require("mongoose"),
  key = require("../config/key"),
  Post = require("../models/post"),
  User = require("../models/user");

//cloudinary config here
cloudinary.config({
  cloud_name: "ximbong91023",
  api_key: key.api_key,
  api_secret: key.api_secret
});

const upload = multer({ dest: "../tmp/uploads" });

const savePost = (post, res, _id) => {
  if (_id) {
    //ID exists => find post and edit
    Post.findOneAndUpdate({ _id }, { $set: post }, function(err, posts) {
      err ? console.log(err) : res.json(posts);
    });
  } else {
    //no ID => create new post
    const newPost = new Post(post);
    newPost.save(function(err, post) {
      if (err) return console.error(err);
      res.json(post);

      User.findByIdAndUpdate(
        newPost.author,
        { $push: { posts: post._id } },
        function(error, result) {
          console.log(result);
        }
      );
    });
  }
};

router.get("/:id", function(req, res) {
  const post_id = req.params.id;
  const { username } = req.user;

  Post.findById(post_id, function(err, post) {
    if (post.author_username === username) {
      //views increment doesn't count if the author views
      post.views += 1;
      post.save(function(err) {
        if (err) return console.error(err);
      });
    }
    err ? console.log(err) : res.json(post);
  });
});

router.get("/limit/:quantity", function(req, res) {
  const quantity = parseInt(req.params.quantity, 10);

  Post.find({})
    .sort({ _id: -1 })
    .limit(quantity)
    .exec(function(err, posts) {
      res.json(posts);
    });
});

router.post("/", upload.single("image_url"), function(req, res, next) {
  const { _id, username } = req.user;

  const newPost = {
    _id: new mongoose.Types.ObjectId(),
    author: _id,
    author_username: username,
    views: 1,
    ...req.body,
    date: Date.now()
  };

  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
      newPost.image_url = result.secure_url;
      savePost(newPost, res);
    });
  } else {
    savePost(newPost, res);
  }
});

router.put("/:id", upload.single("image_url"), function(req, res, next) {
  const { _id, username } = req.user;
  const post_id = req.params.id; //post ID

  Post.findById(post_id, function(error, post) {
    if (post.author_username === username) {
      const post = {
        author: _id,
        author_username: username,
        ...req.body,
        date: Date.now()
      };

      if (req.file) {
        cloudinary.v2.uploader.upload(req.file.path, function(error, result) {
          post.image_url = result.secure_url;
          savePost(post, res, post_id);
        });
      } else {
        savePost(post, res, post_id);
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  });
});

router.delete("/:id", function(req, res) {
  const post_id = req.params.id;
  const { _id } = req.user;

  User.findById(_id, function(err, user) {
    if (err) return console.error(err);
    user.posts.pop(post_id);
    user.save(function(err, post) {
      if (err) return console.error(err);
    });
  });

  Post.findByIdAndRemove(post_id, function(err, post) {
    err ? console.log(err) : res.json(post);
  });
});

module.exports = router;
