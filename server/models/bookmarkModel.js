const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Use a polymorphic reference field to reference either a Movie or a Series
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "contentType",
  },
  // Define a field to specify the type of content (either "Movie" or "Series")
  contentType: {
    type: String,
    enum: ["movies", "series"],
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

// Add a unique compound index on user and content fields
bookmarkSchema.index({ userId: 1, contentId: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

module.exports = Bookmark;
