import { useState } from "react";

export default function Profile() {
  // Mock user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+254 700 000 000",
    address: "123 Beach Avenue, Mombasa, Kenya",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
    alert("Profile updated (mock save).");
  };

  return (
    <div className="min-h-screen bg-[#efede3] text-[#302f2c] font-sans">
      {/* Hero */}
      <section className="bg-[#302f2c] text-[#efede3] py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Profile</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          View and update your personal information.
        </p>
      </section>

      {/* Profile Details */}
      <section className="py-16 px-8 max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded shadow space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Account Information</h2>
            <button
              className="bg-[#302f2c] text-[#efede3] px-4 py-2 rounded hover:bg-gray-800 transition"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#302f2c] ${editMode ? "" : "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#302f2c] ${editMode ? "" : "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#302f2c] ${editMode ? "" : "bg-gray-100"}`}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!editMode}
                rows="3"
                className={`w-full border p-2 rounded outline-none focus:ring-2 focus:ring-[#302f2c] ${editMode ? "" : "bg-gray-100"}`}
              />
            </div>

            {editMode && (
              <button
                className="bg-[#302f2c] text-[#efede3] px-6 py-2 rounded hover:bg-gray-800 transition"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>

        {/* Mock Booking History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Booking History</h2>
          <div className="bg-white p-6 rounded shadow space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <p>Room: Ocean View Suite</p>
              <p>Check-in: 2025-11-15</p>
              <p>Check-out: 2025-11-20</p>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <p>Room: Garden Deluxe</p>
              <p>Check-in: 2025-09-10</p>
              <p>Check-out: 2025-09-15</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
