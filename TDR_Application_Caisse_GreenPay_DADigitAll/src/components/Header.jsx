import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {

  const [open, setOpen] = useState(false);

  const { auth, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout(){

      logout();

      navigate("/");

  }

  return (
    <header className="relative z-20 flex justify-between items-center bg-white shadow px-6 py-4">

      {/* Partie gauche */}
      <h1 className="text-xl font-semibold">
        Gestion des caisses
      </h1>

      {/* Partie droite */}
      <div className="relative">

        <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg"
        >

            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">

                {auth.user?.name?.charAt(0).toUpperCase()}

            </div>

            <div className="text-left">

                <p className="font-medium">

                    {auth.user?.name}

                </p>

                <p className="text-xs text-gray-500">

                    {auth.entreprise}

                </p>

            </div>

            <span>▼</span>

        </button>

        {open && (

        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">

            <div className="px-4 py-3 border-b">

                <p className="font-semibold">

                    {auth.user?.name}

                </p>

                <p className="text-sm text-gray-500">

                    {auth.role}

                </p>

                <p className="text-xs text-gray-400">

                    {auth.entreprise}

                </p>

            </div>

            <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                👤 Mon profil
            </button>

            <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
                ⚙️ Paramètres
            </button>

            <hr />

            <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
            >
                🚪 Déconnexion
            </button>

        </div>

        )}

      </div>

    </header>
  );
}