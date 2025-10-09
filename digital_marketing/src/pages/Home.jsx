import { servicesDetails } from "../data/servicesDetails";
import { testimonials } from "../data/testimonials";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-24 px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Welcome to Harvion Marketing
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          We create impactful marketing campaigns that grow your business.
        </p>
        <Link className="mt-4 bg-[#efede3] text-[#302f2c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        to="/services">
          Get Started
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-20 px-8">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesDetails.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            >
              <img
                src={service.image}
                alt={service.name}
                className="mb-4 rounded-xl object-cover w-full h-48"
              />
              <h3 className="text-2xl font-semibold mb-2">{service.name}</h3>
              <p className="text-sm mb-2 text-gray-600">{service.category}</p>
              <p className="mb-4">{service.description}</p>
              <p className="font-bold text-lg">{service.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8 bg-[#302f2c] text-[#efede3]">
        <h2 className="text-4xl font-bold mb-12 text-center">Testimonials</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#efede3] text-[#302f2c] p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              <p className="italic mb-6">"{t.testimonial}"</p>
              <div className="flex items-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-bold text-lg">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-8 text-center bg-[#302f2c] text-[#efede3]">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Grow Your Business?
        </h2>
        <Link 
        className="bg-[#efede3] text-[#302f2c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        to="/contact"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
