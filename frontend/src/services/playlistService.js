import api from "./api";

// Create new playlist
export const createPlaylist = (playlistData) =>
  api.post("/playlists", playlistData);

// Fetch all playlists
export const fetchPlaylists = () => api.get("/playlists");

// Add song to playlist
export const addSongToPlaylist = (playlistId, songData) =>
  api.put(`/playlists/${playlistId}/add-song`, songData); // matches backend
