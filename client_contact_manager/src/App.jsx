import { useState } from "react";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";

export default function App() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="min-h-screen bg-asphalt text-paper flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-8 mb-6">Client Contact Manager</h1>
      <div className="w-full max-w-lg">
        <ClientForm onClientAdded={() => setRefresh(refresh + 1)} />
        <ClientList refresh={refresh} />
      </div>
    </div>
  );
}
