const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  content: String,
  image_url: String,
  author_id: Number,
  featured: Boolean
});

module.exports = mongoose.model("Post", postSchema);
