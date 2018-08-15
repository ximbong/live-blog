const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featuredSchema = new Schema({
  data: { type: Schema.Types.ObjectId, ref: "Post" }
});

module.exports = mongoose.model("Featured", featuredSchema);
