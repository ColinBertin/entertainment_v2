const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
chai.use(chaiHttp);
const Series = require("../models/seriesModel");

describe("Series API", () => {
  // describe("POST /api/v1/series", () => {
  //   it("Should create a new serie", (done) => {
  //     const series = new Series({
  //       title: "Test Serie",
  //       release_date: "2023-11-09",
  //       original_language: "en",
  //       overview: "This is a test movie.",
  //       popularity: 100,
  //       poster_url: "http://example.com/test-movie.jpg",
  //     });
  //     chai
  //       .request(serie)
  //       .post("/api/v1/series")
  //       .send(serie.toObject())
  //       .end((err, res) => {
  //         expect(res).to.have.status(201);
  //         expect(res.body).to.have.property("_id");
  //         expect(res.body.title).to.equal("Test Serie");
  //         done();
  //       });
  //   });
  // });

  describe("GET /api/v1/series", () => {
    it("Should get all the series", (done) => {
      chai
        .request(app)
        .get("/api/v1/series")
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

  after((done) => {
    // Drop the database
    mongoose.connection.db.dropDatabase(() => {
      // Close the Mongoose connection
      mongoose.connection.close(() => {
        done();
      });
    });
  });
});
