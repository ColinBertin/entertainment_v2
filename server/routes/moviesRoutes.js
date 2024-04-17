const express = require("express");
const router = express.Router();
const { userVerification } = require("../middlewares/authMiddleware");

const {
  movie_list,
  movie_details,
  // movie_create_post,
  // movie_update_put,
  // movie_delete,
} = require("../controllers/movieController");

router.use(userVerification);

// Route to get a list of all movies
router.get("/api/v1/movies", movie_list);

// Route to get a single movie by ID
router.get("/api/v1/movies/:id", movie_details);

// Route to create a new movie
// router.post("/api/v1/movies", movie_create_post);

// Route to update a movie
// router.put("/api/v1/movies/:id", movie_update_put);

// Route to delete a movie
// router.delete("/api/v1/movies/:id", movie_delete);

module.exports = router;
