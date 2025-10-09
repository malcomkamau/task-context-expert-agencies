import { teamDetails } from "../data/teamDetails";
import { faqs } from "../data/faqs";
import { useState } from "react";
import { Link } from "react-router-dom"

export default function About() {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-24 px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          About Harvion Marketing
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          We are a team dedicated to crafting digital marketing strategies that deliver measurable results.
        </p>
      </section>

      {/* Our Story / Mission */}
      <section className="py-20 px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
        <p className="mb-6">
          At Harvion Marketing, our mission is to help businesses grow by leveraging innovative marketing strategies,
          data-driven insights, and creative solutions that connect with audiences.
        </p>
        <p>
          Founded in 2020, we have worked with startups and established companies alike to amplify their brand presence
          and drive meaningful engagement.
        </p>
      </section>

      {/* Team Section */}
      <section className="py-20 px-8 bg-[#f5f4f1]">
        <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {teamDetails.map((member) => (
            <div
              key={member.id}
              className="bg-[#efede3] p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-2xl font-semibold">{member.name}</h3>
              <p className="text-sm font-medium mb-3 text-gray-600">{member.role}</p>
              <p className="text-gray-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-8 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white p-6 rounded-xl shadow cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            >
              <h3 className="font-bold mb-2 flex justify-between items-center">
                {faq.question}
                <span>{openFAQ === faq.id ? "−" : "+"}</span>
              </h3>
              {openFAQ === faq.id && <p className="mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-8 text-center bg-[#302f2c] text-[#efede3]">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Join Our Journey</h2>
        <p className="mb-8 text-lg md:text-xl">
          Ready to elevate your brand? Contact us and let’s get started!
        </p>
        <Link className="bg-[#efede3] text-[#302f2c] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
        to="/contact">
          Contact Us
        </Link>
      </section>
    </div>
  );
}
