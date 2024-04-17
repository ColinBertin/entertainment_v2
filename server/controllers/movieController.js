const Movie = require("../models/movieModel");

// Display list of all the movies.
exports.movie_list = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const movies = await Movie.find({});

    const moviesWithBookmark = await Promise.all(
      movies.map(async (movie) => {
        const isBookmarked = await movie.isBookmarked(userId);
        return { ...movie._doc, isBookmarked };
      })
    );
    return res.status(200).json(moviesWithBookmark.slice(0, 100));
  } catch (err) {
    console.error("Error handling GET request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Display detail page for a specific movie.
exports.movie_details = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;
    const movieId = req.params.id;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const isBookmarked = await movie.isBookmarked(userId);
    const response = { ...movie._doc, isBookmarked };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error handling GET request:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// // Handle movie create on POST.
// exports.movie_create_post = async (req, res) => {
//   const {
//     title,
//     release_date,
//     original_language,
//     overview,
//     popularity,
//     poster_url,
//   } = req.body;

//   try {
//     const movie = new Movie({
//       title,
//       release_date,
//       original_language,
//       overview,
//       popularity,
//       poster_url,
//     });

//     const createdMovie = await movie.save();
//     res.status(201).json(createdMovie);
//   } catch (err) {
//     console.error("Error creating a movie:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Handle movie update on PUT.
// exports.movie_update_put = async (req, res) => {
//   try {
//     const movieId = req.params.id;
//     const updatedMovieData = req.body;

//     const updatedMovie = await Movie.findByIdAndUpdate(
//       movieId,
//       updatedMovieData,
//       {
//         new: true,
//       }
//     );

//     if (updatedMovie) {
//       res.status(200).json(updatedMovie);
//     } else {
//       res.status(404).json({ error: "Movie not found" });
//     }
//   } catch (err) {
//     console.error("Error updating a movie:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// Handle movie delete on DELETE.
// exports.movie_delete = async (req, res) => {
//   const movieId = req.params.id;

//   try {
//     const deletedMovie = await Movie.findByIdAndDelete(movieId);

//     if (deletedMovie) {
//       res.status(200).json({ message: "Movie deleted successfully" });
//     } else {
//       res.status(404).json({ error: "Movie not found" });
//     }
//   } catch (err) {
//     console.error("Error deleting movie:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
