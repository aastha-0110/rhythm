import React, { useRef, useState, useEffect } from "react";

function Songcard({ song }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const username = localStorage.getItem("username") || "guest";

  // Check if the song is liked on mount
  useEffect(() => {
    const likedSongs = JSON.parse(localStorage.getItem(`likedSongs_${username}`)) || [];
    setIsLiked(likedSongs.some((s) => s.id === song.id));
  }, [song.id, username]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Playback error:", err));
    }
  };

  const toggleLike = () => {
    const likedSongs = JSON.parse(localStorage.getItem(`likedSongs_${username}`)) || [];
    let updatedLikes;

    if (isLiked) {
      // Remove song from liked
      updatedLikes = likedSongs.filter((s) => s.id !== song.id);
    } else {
      // Add song to liked
      updatedLikes = [
        ...likedSongs,
        {
          id: song.id,
          title: song.title,
          artist: song.artist?.name || "Unknown Artist",
          albumCover: song.album?.cover_medium || "https://via.placeholder.com/250",
          preview: song.preview || "",
        },
      ];
    }

    localStorage.setItem(`likedSongs_${username}`, JSON.stringify(updatedLikes));
    setIsLiked(!isLiked);
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-white shadow hover:shadow-md transition">
      <img
        src={song.album?.cover_medium || song.albumCover || "https://via.placeholder.com/250"}
        alt={song.title || "Unknown Title"}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <p className="font-bold text-lg">{song.title}</p>
      <p className="text-sm text-gray-600">{song.artist?.name || song.artist || "Unknown Artist"}</p>

      {song.preview ? (
        <>
          <audio ref={audioRef} src={song.preview} />
          <button
            onClick={togglePlay}
            className="mt-3 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition"
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
        </>
      ) : (
        <p className="text-red-500 mt-2">No Preview Available</p>
      )}

      {/* Like button */}
      <button
        onClick={toggleLike}
        className={`mt-2 w-full py-2 rounded-lg font-semibold shadow-md ${
          isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {isLiked ? "❤️ Liked" : "🤍 Like"}
      </button>
    </div>
  );
}

export default Songcard;
