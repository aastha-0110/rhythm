const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Recording = require("../models/Recordings");

const router = express.Router();

// Storage setup
const storage = multer.diskStorage({
  destination: "uploads/", // folder in your backend
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/recordings - upload a new recording
router.post("/", upload.single("audio"), async (req, res) => {
  try {
    const { title, userId, username } = req.body;

    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const recording = new Recording({
      title,
      userId,
      username,
      audioUrl: `/uploads/${req.file.filename}`,
    });

    await recording.save();
    res.status(201).json({ message: "Recording uploaded!", recording });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/recordings - fetch all recordings
router.get("/", async (req, res) => {
  try {
    const recordings = await Recording.find().sort({ createdAt: -1 });
    res.json(recordings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like / Unlike a recording
router.put("/like/:id", async (req, res) => {
  const recordingId = req.params.id;
  const userId = req.body.userId;

  try {
    const recording = await Recording.findById(recordingId);
    if (!recording) return res.status(404).json({ message: "Recording not found" });

    if (recording.likes.includes(userId)) {
      recording.likes = recording.likes.filter((id) => id !== userId);
    } else {
      recording.likes.push(userId);
    }

    await recording.save();
    res.json({ likesCount: recording.likes.length, liked: recording.likes.includes(userId) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a recording by ID and remove file
router.delete("/:id", async (req, res) => {
  try {
    const recording = await Recording.findById(req.params.id);
    if (!recording) return res.status(404).json({ error: "Recording not found" });

    // Check ownership
    const userId = req.body.userId || req.query.userId;
    if (userId && recording.userId !== userId) {
      return res.status(403).json({ error: "Not authorized to delete this recording" });
    }

    // Remove audio file from storage
    const filePath = path.join(__dirname, "..", recording.audioUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting audio file:", err);
    });

    await recording.deleteOne();
    res.json({ message: "Recording deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
