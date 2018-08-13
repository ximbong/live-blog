const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  category: String,
  description: String,
  content: String,
  image_url: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  author_username: String //denormalize for post preview
});

module.exports = mongoose.model("Post", postSchema);
