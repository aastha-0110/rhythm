import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-500 to-indigo-600 text-white px-4">
      
      {/* Headline */}
      <h1 className="text-5xl font-extrabold mb-4 text-center">
        🎶 Rhythm – Discover, Share & Connect
      </h1>
      
      {/* Short Description */}
      <p className="text-lg mb-8 text-center max-w-2xl leading-relaxed">
        Welcome to <span className="font-semibold">Rhythm</span> – a community-driven 
        music space where you can explore trending tracks, share your own recordings, 
        and be part of a growing music community.  
        
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link to="/signup">
          <button className="bg-transparent border border-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition">
            Sign Up
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-transparent border border-white px-6 py-2 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
