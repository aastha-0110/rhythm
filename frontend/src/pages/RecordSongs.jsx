import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RecordSong() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(""); 
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL({ blob: audioBlob, url });
    };

    mediaRecorderRef.current.start();
    setRecording(true);
    setStatus("🎙️ Recording...");
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
    setStatus("✅ Recording stopped. Ready to upload.");
  };

  const handleUpload = async () => {
    if (!title || !audioURL) {
      setStatus("⚠️ Enter a title and record audio first!");
      return;
    }

    const formData = new FormData();
    const token = localStorage.getItem("token") || "guest";
    const username = localStorage.getItem("username") || "Guest";

    formData.append("title", title);
    formData.append("userId", token);
    formData.append("username", username);
    formData.append("audio", audioURL.blob, "recording.mp3");

    try {
      await axios.post("http://localhost:5000/api/recordings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("✅ Recording uploaded successfully! 🎵");
      setTitle("");
      setAudioURL(null);
    } catch (err) {
      console.error("Upload error:", err.response || err);
      setStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />

      {/* Background with visible image */}
      <div className="relative min-h-screen flex items-center justify-center p-6">
        {/* Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/img.jpg')" }}
        ></div>

        {/* Overlay for readability (not too faded) */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Card Content */}
        <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            🎤 Record Your Song
          </h2>

          <input
            type="text"
            placeholder="Enter song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400"
          />

          <div className="flex space-x-3 mb-4 justify-center">
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                recording
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {recording ? "Stop Recording" : "Start Recording"}
            </button>
            <button
              onClick={handleUpload}
              className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Upload
            </button>
          </div>

          {audioURL && (
            <audio controls src={audioURL.url} className="w-full mb-4 rounded" />
          )}

          {/* Status */}
          {status && (
            <p className="mt-2 text-center text-indigo-700 font-medium">
              {status}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
