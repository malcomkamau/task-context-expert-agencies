import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Portfolio from "./pages/Portfolio";
import ServiceDetails from "./pages/ServiceDetails";

export default function App() {
  return (
    <Router>
      <div className="font-sans bg-[#efede3] text-[#302f2c] min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-[#302f2c] text-[#efede3] p-4 flex justify-between items-center">
          <h1 className="font-bold text-xl">Marketing Co.</h1>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="hover:underline">
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>




        {/* Pages */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-[#302f2c] text-[#efede3] p-6 text-center mt-auto flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Marketing Co. All rights reserved.</p>
          <ul className="flex space-x-4 mt-2 md:mt-0">
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
            </li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}
