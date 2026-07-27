import { NavLink } from "react-router-dom";
import menus from "../config/menu";

export default function Sidebar({ role }) {
  const menu = menus[role] || [];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">
        GreenPay
      </h2>

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