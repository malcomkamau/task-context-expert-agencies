import { useParams, Link } from "react-router-dom";
import { servicesDetails } from "../data/servicesDetails";

export default function ServiceDetails() {
  const { id } = useParams();
  const service = servicesDetails.find((s) => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#efede3] text-[#302f2c] font-sans">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link
            to="/services"
            className="text-[#302f2c] font-semibold underline hover:text-gray-700"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const relatedServices = servicesDetails.filter((s) =>
    service.relatedIds.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-[#efede3] text-[#302f2c] font-sans">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{service.name}</h1>
        <p className="text-lg max-w-xl mx-auto">{service.category}</p>
      </section>

      {/* Main Service Details */}
      <section className="py-16 px-8 max-w-4xl mx-auto space-y-6">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-96 object-cover rounded shadow-lg"
        />

        <p className="text-lg">{service.description}</p>
        <p className="font-bold text-xl">Price: {service.price}</p>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold mb-4">Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonials */}
        {service.testimonials && service.testimonials.length > 0 && (
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-6">What Our Clients Say</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {service.testimonials.map((t, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded shadow flex space-x-4"
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="italic mb-2">"{t.testimonial}"</p>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Services */}
        <div className="mt-10">
          <Link
            to="/services"
            className="inline-block bg-[#302f2c] text-[#efede3] px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Back to Services
          </Link>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 px-8 bg-[#f5f4f1]">
          <h3 className="text-3xl font-bold mb-8 text-center">Related Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {relatedServices.map((s) => (
              <Link
                key={s.id}
                to={`/service/${s.id}`}
                className="bg-white rounded-xl shadow overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1"
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{s.name}</h4>
                  <p className="text-sm font-medium text-gray-600 mb-2">{s.category}</p>
                  <p className="text-[#302f2c] font-semibold">{s.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
