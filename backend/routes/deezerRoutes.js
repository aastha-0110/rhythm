// backend/routes/deezerRoutes.js
 const express = require("express"); 
 const axios = require("axios"); const router = express.Router(); 
 
 router.get("/songs", async (req, res) => { try { const response = await axios.get("https://api.deezer.com/chart"); res.json(response.data.tracks.data); // only send tracks 
}catch (error) { console.error("Error fetching songs:", error.message); res.status(500).json({ error: "Failed to fetch songs" }); } }); 
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const response = await axios.get(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    );

    res.json(response.data.data); // ✅ return only songs array
  } catch (err) {
    console.error("Deezer API error:", err.message);
    res.status(500).json({ error: "Failed to fetch from Deezer" });
  }
});

module.exports = router; // ✅ IMPORTANT