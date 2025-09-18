import { useState, useEffect } from "react";

const ACCENT = "#302f2c";
const BG = "#efede3";

export default function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    capacity: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const [rsvpId, setRsvpId] = useState(null);
  const [rsvpName, setRsvpName] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("view"); // "add" or "view"

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:4000/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
      setFilteredEvents(data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  useEffect(() => {
    let temp = [...events];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      temp = temp.filter(
        e => e.title.toLowerCase().includes(term) || e.description.toLowerCase().includes(term)
      );
    }

    if (filterCategory) temp = temp.filter(e => e.category === filterCategory);
    if (filterDate) {
      const now = new Date();
      temp = temp.filter(e =>
        filterDate === "upcoming" ? new Date(e.date) >= now : new Date(e.date) < now
      );
    }

    setFilteredEvents(temp);
  }, [searchTerm, filterCategory, filterDate, events]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(editingId ? "Updating event..." : "Adding event...");
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:4000/events/${editingId}`
        : "http://localhost:4000/events";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, capacity: Number(form.capacity) })
      });
      if (!res.ok) throw new Error("Server error");

      setForm({ title: "", description: "", date: "", location: "", category: "", capacity: "" });
      setEditingId(null);
      fetchEvents();
      setStatus(editingId ? "Event updated!" : "Event added!");
      setView("view"); // Go back to view after adding/updating
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setStatus("Deleting event...");
    try {
      const res = await fetch(`http://localhost:4000/events/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete event");
      setEvents(prev => prev.filter(e => e.id !== id));
      setStatus("Event deleted!");
    } catch (err) {
      setStatus(err.message);
    }
  };

  const openRSVP = (id) => {
    setRsvpId(id);
    setRsvpName("");
  };

  const handleRSVP = async () => {
    if (!rsvpName) return setStatus("Enter a name to RSVP");
    setStatus("RSVPing...");
    try {
      const res = await fetch(`http://localhost:4000/events/${rsvpId}/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName: rsvpName })
      });
      if (!res.ok) throw new Error("Failed to RSVP");
      fetchEvents();
      setRsvpId(null);
      setStatus("RSVP successful!");
    } catch (err) {
      setStatus(err.message);
    }
  };

  const handleEdit = (event) => {
    setForm({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      category: event.category,
      capacity: event.capacity
    });
    setEditingId(event.id);
    setView("add"); // Switch to add/edit form
  };

  const categories = [...new Set(events.map(e => e.category).filter(c => c))];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${view==="view" ? "bg-gray-200" : "hover:bg-gray-100"}`}
              onClick={() => setView("view")}
            >
              View Events
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left px-4 py-2 rounded ${view==="add" ? "bg-gray-200" : "hover:bg-gray-100"}`}
              onClick={() => { setView("add"); setEditingId(null); setForm({title:"",description:"",date:"",location:"",category:"",capacity:""}) }}
            >
              Add Event
            </button>
          </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Event Management System</h1>

        {view === "add" && (
          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
          >
            <h2 className="text-xl font-semibold">{editingId ? "Edit Event" : "Add Event"}</h2>
            <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full p-2 border rounded"/>
            <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full p-2 border rounded"/>
            <input type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="w-full p-2 border rounded"/>
            <input type="text" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full p-2 border rounded"/>
            <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full p-2 border rounded"/>
            <input type="number" placeholder="Capacity" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} className="w-full p-2 border rounded"/>
            <button type="submit" className="w-full py-2 font-semibold rounded" style={{ backgroundColor: ACCENT, color: BG }} disabled={loading}>
              {editingId ? "Update Event" : "Add Event"}
            </button>
          </form>
        )}

        {view === "view" && (
          <>
            {/* Filters */}
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by title or description"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-1 p-2 border rounded"
              />
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="flex-1 p-2 border rounded"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <select
                value={filterDate}
                onChange={e => setFilterDate(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="">All Dates</option>
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
              </select>
            </div>

            {/* Event List */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <div key={event.id} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 space-y-2">
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
                  <p><strong>Location:</strong> {event.location}</p>
                  <p><strong>Category:</strong> {event.category}</p>
                  <p><strong>Capacity:</strong> {event.capacity}</p>
                  <p><strong>Attendees:</strong> {event.attendees.length}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <button onClick={() => openRSVP(event.id)} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: ACCENT, color: BG }}>RSVP</button>
                    <button onClick={() => handleEdit(event)} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: ACCENT, color: BG }}>Edit</button>
                    <button onClick={() => handleDelete(event.id)} className="px-3 py-1 rounded text-sm" style={{ backgroundColor: ACCENT, color: BG }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* RSVP Modal */}
        {rsvpId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl space-y-4 max-w-sm w-full">
              <h2 className="text-lg font-semibold">RSVP</h2>
              <input
                type="text"
                placeholder="Your name"
                value={rsvpName}
                onChange={e => setRsvpName(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setRsvpId(null)} className="px-3 py-1 rounded border" style={{ borderColor: ACCENT }}>Cancel</button>
                <button onClick={handleRSVP} className="px-3 py-1 rounded" style={{ backgroundColor: ACCENT, color: BG }}>Submit</button>
              </div>
            </div>
          </div>
        )}

        {status && <p className="mt-4 italic">{status}</p>}
      </main>
    </div>
  );
}
