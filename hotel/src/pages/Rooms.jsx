import { roomDetails } from "../data/roomDetails";
import { Link } from "react-router-dom";

export default function Rooms() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#302f2c] to-[#56524f] text-[#efede3] py-28 px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Our Rooms</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover our luxurious rooms designed for comfort, style, and relaxation.
        </p>
      </section>

      {/* Rooms Grid */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {roomDetails.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 hover:scale-105"
            >
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-60 md:h-64 object-cover"
              />
              <div className="p-6 space-y-3">
                <h3 className="text-2xl font-bold">{room.name}</h3>
                <p className="text-sm font-medium text-gray-600">{room.category}</p>
                <p className="text-[#302f2c] font-semibold">{room.price}</p>
                <p className="text-gray-700">{room.description}</p>
                <Link
                  to={`/room/${room.id}`}
                  className="inline-block bg-[#302f2c] text-[#efede3] px-6 py-2 rounded-xl font-semibold hover:bg-gray-800 transition transform hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 text-center bg-[#302f2c] text-[#efede3]">
        <h2 className="text-4xl font-bold mb-6">Experience Luxury Today</h2>
        <p className="mb-8 text-lg md:text-xl">
          Reserve a room and enjoy a memorable stay at OceanView Hotel.
        </p>
        <Link
          to="/contact"
          className="bg-[#efede3] text-[#302f2c] px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition transform hover:scale-105"
        >
          Book Now
        </Link>
      </section>

    </div>
  );
}
