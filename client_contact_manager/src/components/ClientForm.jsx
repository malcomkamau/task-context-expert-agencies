import { useState } from "react";
import { addClient } from "../services/clientService";

export default function ClientForm({ onClientAdded }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", status: "Cold" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addClient(form);
    setForm({ name: "", email: "", phone: "", company: "", status: "Cold" });
    onClientAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-paper rounded shadow-md">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded bg-paper text-asphalt" />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded bg-paper text-asphalt" />
      <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded bg-paper text-asphalt" />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded bg-paper text-asphalt" />

      <select name="status" value={form.status} onChange={handleChange}
        className="block w-full mb-3 p-2 border rounded bg-paper text-asphalt">
        <option>Hot</option>
        <option>Warm</option>
        <option>Cold</option>
      </select>

      <button type="submit"
        className="bg-asphalt text-paper px-4 py-2 rounded hover:opacity-80">
        Add Client
      </button>
    </form>
  );
}
