import { getClients, deleteClient } from "../services/clientService";
import { useState, useEffect } from "react";

export default function ClientList({ refresh }) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(getClients());
  }, [refresh]);

  function handleDelete(id) {
    deleteClient(id);
    setClients(getClients());
  }

  return (
    <div className="mt-6">
      {clients.length === 0 && <p className="text-asphalt">No clients yet.</p>}
      <ul>
        {clients.map(client => (
          <li key={client.id} className="flex justify-between items-center bg-paper border border-asphalt/20 p-3 mb-3 rounded shadow-sm">
            <div className="text-asphalt">
              <strong>{client.name}</strong> – {client.company}<br />
              <small>{client.email}, {client.phone}</small><br />
              <span className="text-sm italic">Status: {client.status}</span>
            </div>
            <button onClick={() => handleDelete(client.id)}
              className="text-red-600 hover:underline ml-3">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
