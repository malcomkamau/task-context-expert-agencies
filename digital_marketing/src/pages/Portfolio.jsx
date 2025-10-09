// Mock data for portfolio projects
const projects = [
  {
    id: 1,
    name: "Brand Identity Design",
    category: "Design",
    description: "Created a complete brand identity package for a tech startup.",
    image: "/images/bid.jpeg",
    price: "$500",
  },
  {
    id: 2,
    name: "Social Media Campaign",
    category: "Marketing",
    description: "Managed a month-long social media campaign with measurable ROI.",
    image: "/images/smc.jpeg",
    price: "$750",
  },
  {
    id: 3,
    name: "Website Redesign",
    category: "Web Development",
    description: "Redesigned a corporate website to improve UX and conversion rates.",
    image: "/images/wr.jpeg",
    price: "$1200",
  },
];

export default function Portfolio() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Portfolio</h1>
        <p className="text-lg max-w-xl mx-auto">
          Explore some of our recent projects and see how we help brands grow.
        </p>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{project.category}</p>
              <p className="mb-2">{project.description}</p>
              <p className="font-semibold">{project.price}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
