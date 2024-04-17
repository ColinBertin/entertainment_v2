// const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const expect = chai.expect;
chai.use(chaiHttp);
const User = require("../models/userModel");

describe("Authentification", () => {
  describe("POST /api/v1/register", () => {
    it("Should create a new user", (done) => {
      const user = new User({
        email: "test_user@gmail.com",
        username: "Test User",
        password: "123456",
      });
      chai
        .request(app)
        .post("/api/v1/register")
        .send(user.toObject())
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal("User signed up successfully!");
          done();
        });
    });
  });

  describe("POST /api/v1/login", () => {
    it("Should not log in", (done) => {
      const user = {
        email: "test1@gmail.com",
        password: "123456",
      };
      chai
        .request(app)
        .post("/api/v1/login")
        .send(user)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(400);
          expect(res.body.message).to.equal("Incorrect email or password!");
          done();
        });
    });
  });

  describe("POST /api/v1/login", () => {
    it("Should log in", (done) => {
      const user = {
        email: "test_user@gmail.com",
        password: "123456",
      };
      chai
        .request(app)
        .post("/api/v1/login")
        .send(user)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.message).to.equal("User logged in successfully!");
          done();
        });
    });
  });
});
