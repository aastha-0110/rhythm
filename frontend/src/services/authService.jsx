import api from "./api";

export const signup = (userData) => api.post("/auth/signup", userData);
export const login = (userData) => api.post("/auth/login", userData);
export const getCurrentUser = () => api.get("/auth/me");
