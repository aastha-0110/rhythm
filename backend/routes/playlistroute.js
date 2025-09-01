const express = require("express");
const router = express.Router();
const Playlist = require("../models/Playlist");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ Create a new playlist
// Create a new playlist (protected route)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const playlist = new Playlist({
      name: req.body.name,
      user: req.user.id,   // 👈 requires token
      songs: Array.isArray(songs) ? songs : [songs],
    });
    await playlist.save();
    res.json(playlist);
  } catch (err) {
    console.error("Error creating playlist:", err);
    res.status(400).json({ error: err.message });
  }
});


// ✅ Get all playlists
// ✅ Get all playlists for logged-in user
// Get all playlists for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });
    res.json({ playlists });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
});


// ✅ Add a song to playlist
// Add song to playlist
router.put("/:id/add-song", authMiddleware, async (req, res) => {
  try {
    const { title, artist, preview, cover } = req.body;
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.songs.push({ title, artist, preview, cover });
    await playlist.save();

    res.json({ playlist });
  } catch (err) {
    res.status(500).json({ error: "Failed to add song" });
  }
});


// ✅ Remove a song from playlist
router.put("/:id/remove-song", authMiddleware, async (req, res) => {
  try {
    const { preview } = req.body; // identify by preview URL
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) return res.status(404).json({ error: "Playlist not found" });

    playlist.songs = playlist.songs.filter(song => song.preview !== preview);
    await playlist.save();

    res.json({ message: "Song removed", playlist });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove song", details: err.message });
  }
});
module.exports = router;