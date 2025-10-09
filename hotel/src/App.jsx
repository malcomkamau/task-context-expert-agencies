import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile"; // New page

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Tailwind active link classes
  const activeClass = "underline font-semibold text-gray-300";

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-[#302f2c] bg-[#efede3]">

        {/* Navbar */}
        <nav className="bg-[#302f2c] text-[#efede3] p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
          <h1 className="font-bold text-xl md:text-2xl">OceanView Hotel</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? activeClass : "hover:underline hover:text-gray-300"}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : "hover:underline hover:text-gray-300"}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms" className={({ isActive }) => isActive ? activeClass : "hover:underline hover:text-gray-300"}>
                Rooms
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : "hover:underline hover:text-gray-300"}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={({ isActive }) => isActive ? activeClass : "hover:underline hover:text-gray-300"}>
                Profile
              </NavLink>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden bg-[#302f2c] text-[#efede3] flex flex-col space-y-2 p-4">
            {["/", "/about", "/rooms", "/contact", "/profile"].map((path, idx) => {
              const labels = ["Home", "About", "Rooms", "Contact", "Profile"];
              return (
                <li key={idx}>
                  <NavLink
                    to={path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => isActive ? activeClass : "hover:underline"}
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}

        {/* Main Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id" element={<RoomDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} /> {/* New route */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-[#302f2c] text-[#efede3] p-6 mt-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} OceanView Hotel. All rights reserved.</p>
            <ul className="flex flex-wrap space-x-4 mt-4 md:mt-0 text-sm">
              {["/", "/about", "/rooms", "/contact", "/profile"].map((path, idx) => {
                const labels = ["Home", "About", "Rooms", "Contact", "Profile"];
                return (
                  <li key={idx}>
                    <NavLink
                      to={path}
                      className={({ isActive }) => isActive ? activeClass : "hover:underline"}
                    >
                      {labels[idx]}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </footer>
      </div>
    </Router>
  );
}
