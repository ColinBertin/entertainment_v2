const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../models/userModel");
const Series = require("../models/seriesModel");
const Movie = require("../models/movieModel");

async function clearCollection() {
  try {
    await User.deleteMany({});
    await Series.deleteMany({});
    await Movie.deleteMany({});
    console.log("Collection cleared successfully");
  } catch (error) {
    console.error("Error clearing collection:", error);
  }
}

async function generateSeries() {
  const series = [];
  const seenNames = new Set();

  for (let i = 1; i <= 2; i++) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=c60e8b2d743239f99317ff6a0d177935&page=${i}`
    );

    const newSeries = response.data.results;

    // Filter out duplicates based on the series name
    newSeries.forEach((serie) => {
      if (!seenNames.has(serie.name)) {
        seenNames.add(serie.name);
        if (serie.name && serie.first_air_date && serie.overview) {
          series.push({
            ...serie,
            poster_url: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
            backdrop_url: `https://image.tmdb.org/t/p/w500${serie.backdrop_path}`,
          });
        }
      }
    });
  }
  return series;
}

async function generateMovies() {
  const movies = [];
  const seenTitles = new Set();

  for (let i = 1; i <= 2; i++) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=c60e8b2d743239f99317ff6a0d177935&page=${i}`
    );

    const newMovies = response.data.results;

    // Filter out duplicates based on the movie title
    newMovies.forEach((movie) => {
      if (!seenTitles.has(movie.title)) {
        seenTitles.add(movie.title);
        if (movie.title && movie.release_date && movie.overview) {
          movies.push({
            ...movie,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            backdrop_url: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          });
        }
      }
    });
  }
  return movies;
}

const seedDB = async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(
      "mongodb+srv://Cluster45971:197382465@cluster45971.zdttanb.mongodb.net/entertainment?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    await clearCollection();

    const seriesToSeed = await generateSeries();
    const moviesToSeed = await generateMovies();

    // Insert the data into the "movies" collection
    await Series.insertMany(seriesToSeed);
    await Movie.insertMany(moviesToSeed);

    console.log("Data seeded successfully");

    // Fetch all movies using await
    const series = await Series.find({});
    const movies = await Movie.find({});
    console.log(`${movies.length} movies has been added to the DB`);
    console.log(`${series.length} TV series has been added to the DB`);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    // Close the database connection
    mongoose.disconnect();
  }
};

seedDB();
