const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const router = require("./router");
const helmet = require("helmet");
const path = require("path");

mongoose.set("strictQuery", true);

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  process.env.CLIENT_DOMAIN,
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

app.use(helmet.xssFilter());
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

const getDatabaseUri = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.ATLAS_URI_TEST;
  }
  return process.env.ATLAS_URI;
};

async function startServer() {
  try {
    const databaseUri = await getDatabaseUri();

    await mongoose.connect(databaseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// API routes before static files
app.use(router);

// Static file serving with specific middleware
app.use("/static", express.static(path.join(__dirname, "public"))); // Assuming your static files are in a "public" folder

// Serve index.html for unmatched routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "build", "entertainment_v1", "index.html")
  );
});
// Export app for testing purpose
module.exports = app;

startServer();
