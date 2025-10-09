import { useState } from "react";
import { userDetails } from "../data/userDetails";

export default function Profile() {
  const [user, setUser] = useState(userDetails);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    userDetails[name] = value; // sync shared mock state
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setUser({ ...user, avatar: reader.result });
        userDetails.avatar = reader.result; // sync shared mock state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    alert("Profile saved (mock). Changes reflect on Dashboard too.");
  };

  return (
    <div className="min-h-screen bg-[#efede3] text-[#302f2c] p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
        <div className="mb-6 text-center">
          <img
            src={avatarPreview || "https://via.placeholder.com/100"}
            alt={user.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="block mx-auto text-sm"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#302f2c] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#302f2c] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-gray-400 transition"
            disabled
          />
        </div>

        <button
          onClick={handleSave}
          className="bg-[#302f2c] text-[#efede3] px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition w-full"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
