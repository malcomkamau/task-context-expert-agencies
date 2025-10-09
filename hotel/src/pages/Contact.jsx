import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your message has been sent (mock submission).");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#efede3] text-[#302f2c] font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#302f2c] to-[#56524f] text-[#efede3] py-24 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have a question or want to book your stay? Fill out the form below and we'll get back to you.
        </p>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-8 max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-2xl shadow-lg space-y-6"
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#302f2c] transition"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#302f2c] transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-semibold">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#302f2c] transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-[#302f2c] transition"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#302f2c] text-[#efede3] px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition transform hover:scale-105"
          >
            Send Message
          </button>
        </form>

        {/* Map & Social Media */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Find Us</h2>
          <div className="w-full h-64 rounded-2xl shadow-lg overflow-hidden mb-8">
            {/* Replace with actual Google Map iframe if desired */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <p className="text-gray-700 font-semibold">Map Placeholder</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6 text-2xl text-[#302f2c]">
            <a href="#" className="hover:text-gray-700 hover:scale-110 transform transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-gray-700 hover:scale-110 transform transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-gray-700 hover:scale-110 transform transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-700 hover:scale-110 transform transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
