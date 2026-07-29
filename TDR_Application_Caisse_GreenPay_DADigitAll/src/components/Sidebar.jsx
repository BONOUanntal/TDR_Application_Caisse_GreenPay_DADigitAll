import { NavLink } from "react-router-dom";
import menus from "../config/menu";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ role }) {
  const {auth} = useAuth();

  const menu = menus[auth.role] || [];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-1">

          {auth.entreprise === "greenpay"
              ? "GreenPay"
              : "DA Digit All"}

      </h2>

      <p className="text-sm text-gray-400 mb-8">

          Gestion des caisses

      </p>

      <nav className="space-y-3">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="block hover:text-green-400"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}