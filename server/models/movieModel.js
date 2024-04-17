const mongoose = require("mongoose");
const Bookmark = require("./bookmarkModel");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  release_date: { type: String, required: true },
  original_language: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number },
  poster_url: { type: String, required: true },
  backdrop_url: { type: String },
  origin_country: { type: String },
  original_title: { type: String },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

movieSchema.methods.isBookmarked = async function (userId) {
  const bookmark = await Bookmark.findOne(
    { userId, contentId: this._id.toString() },
    { _id: 1 }
  );
  return !!bookmark;
};

module.exports = mongoose.model("Movie", movieSchema);
