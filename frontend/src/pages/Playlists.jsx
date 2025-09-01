import React, { useEffect, useState } from "react";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const token = localStorage.getItem("token"); // assuming JWT stored

useEffect(() => {
  fetch("/api/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const finalData = data.playlists || data;
      setPlaylists(Array.isArray(finalData) ? finalData : []);
    });
}, [token]);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Playlists</h2>
      {playlists.map((pl) => (
        <div key={pl._id} className="p-4 bg-gray-100 rounded-lg mb-3">
          <h3 className="font-semibold">{pl.name}</h3>
          <p className="text-sm text-gray-600">{pl.description}</p>
          <a href={`/playlists/${pl._id}`} className="text-blue-500">View</a>
        </div>
      ))}
    </div>
  );
}

export default Playlists;
