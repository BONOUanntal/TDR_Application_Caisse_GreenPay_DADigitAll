import { useState } from "react";

export default function Header() {

  const [open, setOpen] = useState(false);

  return (
    <header className="flex justify-between items-center bg-white shadow px-6 py-4">

      {/* Partie gauche */}
      <h1 className="text-xl font-semibold">
        Gestion des caisses
      </h1>

      {/* Partie droite */}
      <div className="relative">

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
          <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
            A
          </div>

          <span className="font-medium">
            Alice
          </span>

          <span>▼</span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border">

            <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
              👤 Mon profil
            </button>

            <button className="w-full text-left px-4 py-3 hover:bg-gray-100">
              ⚙️ Paramètres
            </button>

            <hr />

            <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">
              🚪 Déconnexion
            </button>

          </div>
        )}

      </div>

    </header>
  );
}