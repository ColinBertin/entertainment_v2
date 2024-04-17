const express = require("express");

const router = express.Router();

router.use(require("./routes/authRoutes"));
router.use(require("./routes/moviesRoutes"));
router.use(require("./routes/seriesRoutes"));
router.use(require("./routes/bookmarksRoutes"));
router.use(require("./routes/usersRoutes"));

module.exports = router;
