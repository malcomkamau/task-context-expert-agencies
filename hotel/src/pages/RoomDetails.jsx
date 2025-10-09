import { useParams, Link } from "react-router-dom";
import { roomDetails } from "../data/roomDetails";

export default function RoomDetails() {
  const { id } = useParams();
  const room = roomDetails.find((r) => r.id === parseInt(id));

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efede3] text-[#302f2c] font-sans">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Room Not Found</h1>
          <Link
            to="/rooms"
            className="text-[#302f2c] font-semibold underline hover:text-gray-700"
          >
            Back to Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#efede3] text-[#302f2c] font-sans">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#302f2c] to-[#56524f] text-[#efede3] py-24 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{room.name}</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto">{room.category}</p>
      </section>

      {/* Room Images Gallery */}
      <section className="py-16 px-8 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {room.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${room.name} ${index + 1}`}
              className="w-full h-64 md:h-80 object-cover rounded shadow-lg transform hover:scale-105 transition duration-300"
            />
          ))}
        </div>

        {/* Room Details */}
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 space-y-6">
          <p className="text-lg">{room.description}</p>
          <p className="font-bold text-xl">Price: {room.price}</p>

          {/* Amenities */}
          <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
          <ul className="list-disc list-inside grid sm:grid-cols-1 md:grid-cols-2 gap-2">
            {room.amenities.map((amenity, idx) => (
              <li key={idx}>{amenity}</li>
            ))}
          </ul>

          <Link
            to="/contact"
            className="inline-block bg-[#302f2c] text-[#efede3] px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 hover:scale-105 transition transform"
          >
            Book Now
          </Link>
        </div>

        <Link
          to="/rooms"
          className="inline-block text-[#302f2c] font-semibold underline hover:text-gray-700"
        >
          Back to Rooms
        </Link>
      </section>
    </div>
  );
}
