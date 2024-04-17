const Series = require("../models/seriesModel");

// Display lst of all the series.
exports.series_list = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const series = await Series.find({});

    const seriesWithBookmark = await Promise.all(
      series.map(async (s) => {
        const isBookmarked = await s.isBookmarked(userId);
        return { ...s._doc, isBookmarked };
      })
    );
    return res.status(200).json(seriesWithBookmark);
  } catch (err) {
    console.error("Error handling GET request:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Display detail page for a specific serie.
exports.series_details = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;
    const serieId = req.params.id;

    const series = await Series.findById(serieId);

    if (!series) {
      return res.status(404).json({ error: "Series not found" });
    }

    const isBookmarked = await series.isBookmarked(userId);
    const response = { ...series._doc, isBookmarked };

    return res.status(200).json(response);
  } catch (err) {
    console.error("Error handling GET request:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
