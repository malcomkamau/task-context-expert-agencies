import { servicesDetails } from "../data/servicesDetails";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6 leading-tight">Our Services</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Discover the range of services we offer to boost your brand's presence and performance.
        </p>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesDetails.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="text-sm font-medium text-gray-600 mb-2">{service.category}</p>
                <p className="text-[#302f2c] font-semibold mb-2">{service.price}</p>
                <p className="mb-4 text-gray-700">{service.description}</p>
                
                {/* Updated Learn More Button */}
                <Link
                  to={`/service/${service.id}`}
                  className="bg-[#302f2c] text-[#efede3] px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 text-center bg-[#302f2c] text-[#efede3]">
        <h2 className="text-4xl font-bold mb-6">Want to Boost Your Business?</h2>
        <p className="mb-8 text-lg md:text-xl">Contact us today to get a tailored marketing strategy.</p>
        <Link
          className="bg-[#efede3] text-[#302f2c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
          to="/contact"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
