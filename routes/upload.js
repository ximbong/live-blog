const express = require("express"),
  router = express.Router(),
  multer = require("multer"),
  Post = require("../models/post");

function getFileExtension(string) {
  const nameArray = string.split(".");
  return nameArray[nameArray.length - 1];
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "upload/");
  },
  filename: function(req, file, cb) {
    const fileID = req.body._id;
    const fileExtension = getFileExtension(file.originalname);
    cb(null, `${fileID}.${fileExtension}`);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image_url"), function(req, res, next) {
  res.json(req.body);
});

module.exports = router;
