import { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

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
    <div className="bg-[#efede3] text-[#302f2c] font-sans min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Have a question or want to work together? Fill out the form below and we'll get back to you.
        </p>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 px-8 max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-lg space-y-6">
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
            className="bg-[#302f2c] text-[#efede3] px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Send Message
          </button>
        </form>

        {/* Map & Social Media */}
        <div className="space-y-8">
          {/* Google Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Company Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.8859323311316!2d-122.08424948469203!3d37.42206577982521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb737e2f72c0f%3A0x9c318c93996d43cb!2sGoogleplex!5e0!3m2!1sen!2sus!4v1696937643545!5m2!1sen!2sus"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-[#302f2c] text-[#efede3] p-3 rounded-full hover:bg-gray-800 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#302f2c] text-[#efede3] p-3 rounded-full hover:bg-gray-800 transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-[#302f2c] text-[#efede3] p-3 rounded-full hover:bg-gray-800 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" className="bg-[#302f2c] text-[#efede3] p-3 rounded-full hover:bg-gray-800 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
