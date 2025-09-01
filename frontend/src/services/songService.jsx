import api from "./api";

export const fetchSongs = () => api.get("/songs");
export const getSongById = (id) => api.get(`/songs/${id}`);
