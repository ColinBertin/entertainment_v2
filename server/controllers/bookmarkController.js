const Bookmark = require("../models/bookmarkModel");
const Movie = require("../models/movieModel");
const Series = require("../models/seriesModel");
const mongoose = require("mongoose");

exports.create_bookmark = async (req, res) => {
  try {
    const { user } = req;
    const { contentId, contentType } = req.body;
    const userId = user.id;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid contentId" });
    }

    let contentModel;
    if (contentType === "movies") {
      contentModel = Movie;
    } else if (contentType === "series") {
      contentModel = Series;
    } else {
      return res.status(400).json({ message: "Invalid contentType" });
    }

    const content = await contentModel.find({ _id: contentId, userId });

    if (!content.length) {
      return res.status(404).json({ message: "Content not found" });
    }

    const bookmark = new Bookmark({
      userId: user._id,
      contentId,
      contentType,
    });
    await bookmark.save();

    return res.status(201).json({
      message: "Bookmark successful!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Bookmarking failed!" });
  }
};

// Retrieve bookmarked movies
exports.list_bookmarked_movies = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const bookmarkedMovies = await Bookmark.find({
      userId,
      contentType: "movies",
    });

    // Extracting movieIds
    const movieIds = bookmarkedMovies.map((bookmark) => bookmark.contentId);

    // Fetching movies
    const movies = await Movie.find({ _id: { $in: movieIds } });

    const moviesWithBookmark = await Promise.all(
      movies.map(async (movie) => {
        const isBookmarked = await movie.isBookmarked(userId);
        return {
          ...movie.toObject(),
          isBookmarked,
        };
      })
    );

    return res.status(200).json(moviesWithBookmark);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve bookmarks" });
  }
};

// Retrieve bookmarked series
exports.list_bookmarked_series = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const bookmarkedSeries = await Bookmark.find({
      userId,
      contentType: "series",
    });

    // Extracting seriesIds from bookmarks
    const seriesIds = bookmarkedSeries.map((bookmark) => bookmark.contentId);

    // Fetching series
    const series = await Series.find({ _id: { $in: seriesIds } });

    const seriesWithBookmark = await Promise.all(
      series.map(async (s) => {
        const isBookmarked = await s.isBookmarked(userId);
        return {
          ...s.toObject(),
          isBookmarked,
        };
      })
    );

    return res.status(200).json(seriesWithBookmark);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve bookmarks" });
  }
};

// Retrieve all bookmarked
exports.list_bookmarked = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const bookmarkedMovies = await Bookmark.find({
      userId,
      contentType: "movies",
    });

    const bookmarkedSeries = await Bookmark.find({
      userId,
      contentType: "series",
    });

    // Extracting movieIds & seriesIds from bookmarks
    const movieIds = bookmarkedMovies.map((bookmark) => bookmark.contentId);
    const seriesIds = bookmarkedSeries.map((bookmark) => bookmark.contentId);

    // Fetching movies & series corresponding to the ids
    const movies = await Movie.find({ _id: { $in: movieIds } });
    const series = await Series.find({ _id: { $in: seriesIds } });

    const moviesWithBookmark = await Promise.all(
      movies.map(async (movie) => {
        const isBookmarked = await movie.isBookmarked(userId);
        return {
          ...movie.toObject(),
          isBookmarked,
        };
      })
    );

    const seriesWithBookmark = await Promise.all(
      series.map(async (s) => {
        const isBookmarked = await s.isBookmarked(userId);
        return {
          ...s.toObject(),
          isBookmarked,
        };
      })
    );

    return res.status(200).json([...moviesWithBookmark, ...seriesWithBookmark]);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve bookmarks" });
  }
};

// Delete a bookmark
exports.delete_bookmark = async (req, res) => {
  try {
    const { contentId } = req.body;
    const { user } = req;
    const userId = user.id;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid contentId" });
    }

    const bookmark = await Bookmark.findOne({ contentId, userId });

    if (!bookmark) {
      return res.status(500).json({ message: "No content found." });
    }

    await bookmark.deleteOne();
    return res
      .status(202)
      .json({ success: true, message: "Bookmark deleted!" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete bookmark" });
  }
};
