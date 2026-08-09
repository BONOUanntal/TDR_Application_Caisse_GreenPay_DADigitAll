import { NavLink } from "react-router-dom";
import menus from "../config/menu";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
    const { auth } = useAuth();

    const menu = menus[auth?.role] || [];

    return (
        <aside className="w-64 bg-gray-900 text-white p-6">

            <h2 className="text-xl font-bold mb-2">
                {auth?.entreprise === "greenpay"
                    ? "GreenPay"
                    : "DA Digit All"}
            </h2>

            <p className="text-sm text-gray-400 mb-8">
                Gestion des caisses
            </p>

            <nav className="space-y-2">

                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/dashboard"}
                        className={({ isActive }) =>
                            `block px-4 py-3 rounded-lg transition ${
                                isActive
                                    ? "bg-green-600 text-white"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}

            </nav>

        </aside>
    );
}