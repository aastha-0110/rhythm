import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import Playlists from "./pages/Playlists";
import LikedSongs from "./pages/LikedSongs";
import RecordSong from "./pages/RecordSongs";
import RecordingsPage from "./pages/RecordingPage";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
function App() {
  const isAuthenticated = localStorage.getItem("token"); // or context

  return (
    
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /><Route path="/playlists" element={<Playlists />} />
        <Route path="/liked" element={<LikedSongs />} />
        <Route path="/recordings" element={<RecordingsPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />

<Route path="/record" element={<RecordSong />} />


      </Routes>
   
  );
}

export default App;
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = () => setIsAuthenticated(true);
//   const handleLogout = () => setIsAuthenticated(false);

//   return (
//     <>
//       <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
