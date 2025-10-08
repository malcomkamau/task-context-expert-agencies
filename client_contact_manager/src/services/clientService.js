const STORAGE_KEY = "clients";

export function getClients() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addClient(client) {
  const clients = getClients();
  clients.push({ id: Date.now(), ...client });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}

export function deleteClient(id) {
  let clients = getClients();
  clients = clients.filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
}
