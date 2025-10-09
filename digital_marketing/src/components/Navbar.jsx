import React from "react";
import { navLinks } from "../data/userDetails";

export default function Navbar() {
  return (
    <nav className="bg-[#302f2c] text-[#efede3] p-4 flex justify-between items-center sticky top-0 z-10">
      <h1 className="text-xl font-bold">MarketEdge</h1>
      <ul className="flex space-x-6">
        {navLinks.map((link, idx) => (
          <li key={idx} className="hover:underline cursor-pointer">{link}</li>
        ))}
      </ul>
    </nav>
  );
}
