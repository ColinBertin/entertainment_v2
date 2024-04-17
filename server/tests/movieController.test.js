const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
chai.use(chaiHttp);
const Movie = require("../models/movieModel");

describe("Movie API", () => {
  describe("POST /api/v1/movies", () => {
    it("Should create a new movie", (done) => {
      const movie = new Movie({
        title: "Test Movie",
        release_date: "2023-11-09",
        original_language: "en",
        overview: "This is a test movie.",
        popularity: 100,
        poster_url: "http://example.com/test-movie.jpg",
      });
      chai
        .request(app)
        .post("/api/v1/movies")
        .send(movie.toObject())
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("_id");
          expect(res.body.title).to.equal("Test Movie");
          done();
        });
    });
  });

  describe("GET /api/v1/movies", () => {
    it("Should get all the movies", (done) => {
      chai
        .request(app)
        .get("/api/v1/movies")
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
