import React, { useEffect, useState } from "react";
import axios from "axios";

function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);

useEffect(() => {
  axios.get("/api/playlists", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  })
    .then(res => {
      const data = res.data.playlists || res.data;
      setPlaylists(Array.isArray(data) ? data : []);
    })
    .catch(err => console.error("Failed to fetch playlists", err));
}, []);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎵 Your Playlists</h1>
      {playlists.map(pl => (
        <div key={pl._id} className="mb-6 p-4 border rounded-lg shadow bg-white">
          <h2 className="font-bold text-xl">{pl.name}</h2>
          <p className="text-sm text-gray-600">{pl.description}</p>

          <div className="grid grid-cols-2 gap-4 mt-3">
            {pl.songs.map((song, i) => (
              <div key={i} className="p-2 border rounded shadow-sm bg-gray-50">
                <img src={song.cover} alt={song.title} className="rounded mb-2" />
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
                <audio controls src={song.preview} className="w-full mt-2"></audio>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaylistPage;
