const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  category: String, // TODO: consider adding index
  description: String,
  content: String,
  image_url: String,
  views: { type: Number, index: true },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  author_username: String //denormalize for post preview
});

postSchema.index({ views: -1 });

module.exports = mongoose.model("Post", postSchema);
