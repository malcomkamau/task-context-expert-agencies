import { roomDetails } from "../data/roomDetails";
import { servicesDetails } from "../data/servicesDetails";
import { testimonials } from "../data/testimonials";
import { galleryImages } from "../data/galleryImages";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">

      {/* Hero Section */}
      <section className="relative bg-[#302f2c] text-[#efede3] py-32 px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hotel-hero.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-fadeIn">Welcome to OceanView Hotel</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6 animate-fadeIn delay-200">
            Experience luxury and comfort by the sea. Relax, unwind, and let us take care of the rest.
          </p>
          <Link
            to="/rooms"
            className="bg-gradient-to-r from-[#efede3] to-gray-200 text-[#302f2c] px-8 py-3 rounded-lg font-semibold hover:scale-105 transform transition duration-300"
          >
            Explore Rooms
          </Link>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Rooms</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {roomDetails.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              <img src={room.images[0]} alt={room.name} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{room.name}</h3>
                <p className="text-sm font-medium text-gray-600 mb-2">{room.category}</p>
                <p className="text-[#302f2c] font-semibold mb-2">{room.price}</p>
                <p className="mb-4 text-gray-700 line-clamp-3">{room.description}</p>
                <Link
                  to={`/room/${room.id}`}
                  className="bg-[#302f2c] text-[#efede3] px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-8 bg-[#f5f4f1]">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {servicesDetails.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded shadow hover:shadow-lg transform hover:scale-105 transition duration-300 text-center"
            >
              <img src={service.image} alt={service.name} className="w-full h-40 object-cover rounded mb-4" />
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-sm mb-2">{service.category}</p>
              <p className="font-semibold">{service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold mb-12 text-center">Guest Reviews</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-[#302f2c] text-[#efede3] p-6 rounded shadow hover:scale-105 transition duration-300">
              <p className="italic mb-4">"{t.testimonial}"</p>
              <div className="flex items-center">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full mr-4 border-2 border-[#efede3]" />
                <div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-8 bg-[#f5f4f1]">
        <h2 className="text-3xl font-bold mb-12 text-center">Gallery</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery ${idx}`}
              className="w-full h-40 object-cover rounded shadow hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => window.open(img, "_blank")}
            />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 text-center bg-[#302f2c] text-[#efede3]">
        <h2 className="text-4xl font-bold mb-6">Book Your Stay Today</h2>
        <p className="mb-8 text-lg md:text-xl">Reserve your room and enjoy an unforgettable experience.</p>
        <Link
          to="/rooms"
          className="bg-gradient-to-r from-[#efede3] to-gray-200 text-[#302f2c] px-8 py-3 rounded-lg font-semibold hover:scale-105 transform transition duration-300"
        >
          View Rooms
        </Link>
      </section>

    </div>
  );
}
