import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  return (
    <div className="bg-[#efede3] text-[#302f2c] font-sans">
      {/* Hero Section */}
      <section className="bg-[#302f2c] text-[#efede3] py-20 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-lg max-w-xl mx-auto">
          Stay updated with the latest marketing tips, industry news, and strategies.
        </p>
      </section>

      {/* Blog Posts */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded shadow overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{post.date}</p>
                <p className="mb-4">{post.excerpt}</p>
                <button className="bg-[#302f2c] text-[#efede3] px-4 py-2 rounded hover:bg-gray-800">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
