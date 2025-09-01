const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true }, // For now, just store token or user email
  username: { type: String, required: true },
  audioUrl: { type: String, required: true },
  likes: [String] ,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Recording", recordingSchema);
