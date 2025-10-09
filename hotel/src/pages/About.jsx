import { teamDetails } from "../data/teamDetails";
import { amenitiesHighlights } from "../data/amenitiesHighlights";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">

      {/* Hero Section */}
      <section className="relative bg-[#302f2c] text-[#efede3] py-28 px-8 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hotel-hero2.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">About Our Hotel</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn delay-200">
            Welcome to our luxurious hotel where comfort meets elegance. Experience world-class hospitality and exceptional services.
          </p>
        </div>
      </section>

      {/* Our Story / Mission */}
      <section className="py-16 px-8 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="mb-4">
            Our mission is to provide an unforgettable stay for every guest by combining comfort, luxury, and personalized service.
          </p>
          <p>
            Established in 2015, we have been consistently delivering exceptional experiences to travelers from around the globe.
          </p>
        </div>
        <img src="/images/mission.jpeg" alt="Our Mission" className="rounded shadow-lg" />
      </section>

      {/* Amenities Highlights */}
      <section className="py-16 px-8 bg-[#f5f4f1]">
        <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {amenitiesHighlights.map((amenity) => (
            <div key={amenity.id} className="bg-[#efede3] p-6 rounded shadow text-center hover:shadow-lg hover:scale-105 transform transition duration-300">
              <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-[#302f2c] to-[#56524f]">
                <img src={amenity.image} alt={amenity.name} className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{amenity.name}</h3>
              <p>{amenity.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team / Management */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamDetails.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded shadow text-center hover:scale-105 transform transition duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 border-2 border-[#302f2c] shadow-md"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm font-medium mb-2">{member.role}</p>
              <p className="mb-4">{member.bio}</p>
              <div className="flex justify-center space-x-4">
                {member.socials?.map((s, idx) => (
                  <a key={idx} href={s.link} target="_blank" rel="noopener noreferrer" className="text-[#302f2c] hover:text-gray-700 transition">
                    <img src={s.icon} alt={s.platform} className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 text-center bg-[#302f2c] text-[#efede3] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hotel-cta.jpg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Plan Your Stay With Us</h2>
          <p className="mb-6">Book a room now and enjoy an unforgettable experience.</p>
          <Link
            to="/rooms"
            className="bg-gradient-to-r from-[#efede3] to-gray-200 text-[#302f2c] px-6 py-2 rounded hover:scale-105 transform transition duration-300"
          >
            View Rooms
          </Link>
        </div>
      </section>

    </div>
  );
}
