import React, { useEffect, useState } from "react";
import Songcard from "../components/Songcard";
import Navbar from "../components/Navbar";

function HomePage() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/deezer/songs?q=arijit")
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <Navbar />

      {/* Pastel Background that matches violet/indigo navbar */}
      <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-indigo-50 p-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800">
          🎵 Trending Songs
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs.map(song => (
            <div
              key={song.id}
              className="bg-white shadow-md rounded-xl p-2 hover:shadow-xl transition-shadow duration-300"
            >
              <Songcard song={song} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
