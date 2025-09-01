const express=require('express')
const cors = require("cors");
const app=express()
const dotenv = require("dotenv");
// const User = require("./models/User");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songRoutes");
const playlistroute=require("./routes/playlistroute")
const deezerRoutes = require("./routes/deezerRoutes");


const PORT=5000

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistroute);
app.use("/api/deezer", deezerRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/recordings", require("./routes/recordings"));
// Connect to MongoDB
const connectDB = require("./config/db");
dotenv.config();
connectDB();


const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});

app.get('/',(req,res)=>{
    res.send("backend is working")
});





app.listen(PORT,()=>
{
    console.log(`Server running on http://localhost:${PORT}`)
})