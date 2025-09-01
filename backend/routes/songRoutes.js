const express = require("express");
const router = express.Router();
const Song = require("../models/Song"); // import Song model
const authMiddleware = require("../middleware/authMiddleware"); // to protect routes

// ✅ Add a new song (protected route)
router.post("/",authMiddleware,async (req, res) => {
    try {
        const { title, artist, album, fileUrl, coverImage } = req.body;

        const newSong = new Song({ title, artist, album, fileUrl, coverImage });
        await newSong.save();

        res.status(201).json({message:"song added successfully",newSong});
    } catch (err) {
        res.status(500).json({ error: "Failed to add song", details: err.message });
    }
});

// ✅ Get all songs (public route)
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch songs" });
    }
});

// ✅ Get a single song by ID (public route)
router.get("/:id", async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ error: "Song not found" });
        }
        res.json(song);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch song" });
    }
});



module.exports = router;
