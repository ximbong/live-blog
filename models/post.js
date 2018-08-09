const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  category: String,
  description: String,
  content: String,
  image_url: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  featured: Boolean
});

module.exports = mongoose.model("Post", postSchema);
