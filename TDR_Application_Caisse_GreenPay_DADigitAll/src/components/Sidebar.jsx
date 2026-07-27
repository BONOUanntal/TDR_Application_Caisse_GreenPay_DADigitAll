import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">
        GreenPay
      </h2>

      <nav className="space-y-3">
        <NavLink to="/dashboard" className="block hover:text-green-400">
          Dashboard
        </NavLink>

        <div className="flex gap-6"></div>
        <NavLink to="/requests" className="block hover:text-green-400">
          Demandes
        </NavLink>

        <div className="flex gap-6"></div>
        <NavLink to="/cashboxes" className="block hover:text-green-400">
          Caisses
        </NavLink>

        <div className="flex gap-6"></div>
        <NavLink to="/loans" className="block hover:text-green-400">
          Emprunts
        </NavLink>

        <div className="flex gap-6"></div>
        <NavLink to="/reports" className="block hover:text-green-400">
          Rapports
        </NavLink>
      </nav>
    </aside>
  );
}