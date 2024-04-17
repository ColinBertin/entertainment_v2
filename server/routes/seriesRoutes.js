const express = require("express");
const router = express.Router();
const { userVerification } = require("../middlewares/authMiddleware");

const {
  series_list,
  series_details,
} = require("../controllers/seriesController");

router.use(userVerification);

// Route to get a list of all series
router.get("/api/v1/series", series_list);

// Route to get a single series by ID
router.get("/api/v1/series/:id", series_details);

// // Route to create a new serie
// router.post("/api/v1/series", serie_create_post);

// // Route to update a serie
// router.put("/api/v1/series/:id", serie_update_put);

// // Route to delete a serie
// router.delete("/api/v1/series/:id", serie_delete);

module.exports = router;
