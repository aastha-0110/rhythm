import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Songcard from "../components/Songcard";

export default function ProfilePage() {
  const [userRecordings, setUserRecordings] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // recording waiting for confirmation
  const [statusMsg, setStatusMsg] = useState("");
  const userId = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
  fetchUserRecordings();

  // Fetch liked songs specifically for this user
  const storedLikes = JSON.parse(localStorage.getItem(`likedSongs_${username}`)) || [];
  setLikedSongs(storedLikes);

  setUserDetails({
    username: username || "Guest",
    email: localStorage.getItem("email") || "guest",
  });
}, [username]);

  const fetchUserRecordings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recordings");
      const userRecs = res.data.filter((rec) => rec.userId === userId);
      setUserRecordings(userRecs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (recId) => {
    try {
      await axios.delete(`http://localhost:5000/api/recordings/${recId}`, {
        data: { userId },
      });

      setUserRecordings((prev) => prev.filter((rec) => rec._id !== recId));
      setStatusMsg("Recording deleted successfully!");
      setConfirmDeleteId(null);
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (err) {
      console.error("Delete failed:", err);
      setStatusMsg("Failed to delete recording. Try again.");
      setTimeout(() => setStatusMsg(""), 3000);
      setConfirmDeleteId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-7xl mx-auto">
        {/* User Details */}
        <div className="bg-white/90 p-6 rounded-2xl shadow-lg mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{userDetails.username}</h2>
          <p className="text-gray-600">{userDetails.email}</p>
        </div>

        {/* Status message */}
        {statusMsg && (
          <p className="text-center mb-4 text-green-600 font-medium">{statusMsg}</p>
        )}

        {/* User Recordings */}
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-black">Your Recordings</h3>
          {userRecordings.length === 0 ? (
            <p className="text-gray-500">You haven’t posted any recordings yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userRecordings.map((rec) => (
                <div key={rec._id} className="bg-white/80 p-4 rounded-2xl shadow-lg flex flex-col items-center">
                  <p className="font-semibold mb-1">{rec.title}</p>
                  <audio controls src={`http://localhost:5000${rec.audioUrl}`} className="w-full mb-2 rounded" />
                  <p className="text-sm text-gray-500 mb-2">Likes: {rec.likes.length}</p>

                  {confirmDeleteId === rec._id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDelete(rec._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-3 py-1 bg-gray-300 text-black rounded-xl hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(rec._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Liked Songs */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-black">Liked Songs</h3>
          {likedSongs.length === 0 ? (
            <p className="text-gray-300">You haven’t liked any songs yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {likedSongs.map((song) => (
                <Songcard key={song.id} song={song} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
