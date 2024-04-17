const express = require("express");
const router = express.Router();
const { userVerification } = require("../middlewares/authMiddleware");

const {
  create_bookmark,
  list_bookmarked,
  delete_bookmark,
  list_bookmarked_movies,
  list_bookmarked_series,
} = require("../controllers/bookmarkController");

router.use(userVerification);

// Create a bookmark for a specific movie and user
router.post("/api/v1/bookmarks", create_bookmark);

// List all bookmarked
router.get("/api/v1/bookmarks", list_bookmarked);

// List bookmarked movies
router.get("/api/v1/bookmarks/movies", list_bookmarked_movies);

// List bookmarked series
router.get("/api/v1/bookmarks/series", list_bookmarked_series);

router.delete("/api/v1/bookmarks", delete_bookmark);

module.exports = router;
