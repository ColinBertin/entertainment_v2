const mongoose = require("mongoose");
const Bookmark = require("./bookmarkModel");

const seriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  first_air_date: { type: String, required: true },
  original_language: { type: String, required: true },
  overview: { type: String, required: true },
  popularity: { type: Number },
  poster_url: { type: String, required: true },
  backdrop_url: { type: String },
  original_name: { type: String },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

seriesSchema.methods.isBookmarked = async function (userId) {
  const bookmark = await Bookmark.findOne(
    { userId, contentId: this._id.toString() },
    { _id: 1 }
  );
  return !!bookmark;
};

module.exports = mongoose.model("Series", seriesSchema);
