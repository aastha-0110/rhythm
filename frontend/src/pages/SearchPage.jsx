import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const location = useLocation();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Extract query param from URL
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  useEffect(() => {
    if (!searchTerm) return;

    const fetchSongs = async () => {
      try {
        setLoading(true);
        setError("");

        // Deezer API call
        const res = await axios.get(
  `http://localhost:5000/api/deezer/search?query=${encodeURIComponent(searchTerm)}`
);
setSongs(res.data.data); // Deezer returns { data: [...] }
 // Deezer returns { data: [ ...tracks ] }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch songs from Deezer.");
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white mb-4">
        Search Results for:{" "}
        <span className="text-green-400">{searchTerm}</span>
      </h1>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {songs.length === 0 && !loading ? (
        <p className="text-gray-400">No songs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {songs.map((song) => (
            <div
              key={song.id}
              className="bg-white/10 rounded-xl p-4 shadow hover:scale-105 transition"
            >
              <p className="text-white font-semibold">{song.title}</p>
              <p className="text-gray-300 text-sm">{song.artist.name}</p>
              <img
                src={song.album.cover_medium}
                alt={song.title}
                className="rounded-lg my-2"
              />
              <audio controls className="w-full mt-2">
                <source src={song.preview} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
