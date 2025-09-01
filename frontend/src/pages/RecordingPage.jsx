import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function RecordingsPage() {
  const [recordings, setRecordings] = useState([]);
  const userId = localStorage.getItem("token"); // Current user

  useEffect(() => {
    axios.get("http://localhost:5000/api/recordings")
      .then((res) => setRecordings(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleLike = async (rec) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/recordings/like/${rec._id}`,
        { userId }
      );
      setRecordings((prev) =>
        prev.map((r) =>
          r._id === rec._id
            ? {
                ...r,
                likes: res.data.liked
                  ? [...r.likes, userId]
                  : r.likes.filter((id) => id !== userId),
              }
            : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Page Background */}
      <div className="relative min-h-screen bg-gradient-to-b from-purple-100 via-pink-50 to-indigo-100 p-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center text-gray-800 tracking-wide">
            🎤 User Recordings
          </h2>

          {/* Recordings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recordings.map((rec) => {
              const likedByUser = rec.likes?.includes(userId);
              return (
                <div
                  key={rec._id}
                  className="bg-white/70 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center"
                >
                  <p className="font-bold text-lg mb-1 text-gray-900 text-center">
                    {rec.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    By: {rec.username}
                  </p>

                  <audio
                    controls
                    src={`http://localhost:5000${rec.audioUrl}`}
                    className="w-full mb-4 rounded"
                  />

                  <button
                    onClick={() => handleLike(rec)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 ${
                      likedByUser
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    ❤️ {rec.likes.length}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
