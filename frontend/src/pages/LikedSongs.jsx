import React, { useEffect, useState } from "react";
import Songcard from "../components/Songcard";
import Navbar from "../components/Navbar";

function LikedSongs() {
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username") || "guest";

    // Fetch liked songs only for this user
    const storedLikes = JSON.parse(localStorage.getItem(`likedSongs_${username}`)) || [];
    setLikedSongs(storedLikes);
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Liked Songs</h2>

        {likedSongs.length === 0 ? (
          <p className="text-gray-300">You haven’t liked any songs yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {likedSongs.map((song) => (
              <Songcard key={song.id} song={song} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default LikedSongs;
