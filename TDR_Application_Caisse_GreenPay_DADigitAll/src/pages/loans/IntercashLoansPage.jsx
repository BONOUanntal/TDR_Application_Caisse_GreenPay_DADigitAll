import { useEffect, useState } from "react";

import api from "../../services/api";

import IntercashLoans from "../../components/Supervisor/loans/IntercashLoans";

export default function IntercashLoansPage() {

    const [emprunts, setEmprunts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    async function fetchEmprunts() {

        try {

            setLoading(true);
            setError(null);

            const response = await api.get("/emprunts");

            const data =
                Array.isArray(response.data)
                    ? response.data
                    : response.data?.data ?? [];

            setEmprunts(data);

        } catch (error) {

            console.error(
                "Erreur récupération emprunts intercaisses :",
                error.response?.data ?? error
            );

            setError(
                "Impossible de charger les emprunts intercaisses."
            );

        } finally {

            setLoading(false);

        }

    }


    useEffect(() => {

        fetchEmprunts();

    }, []);


    return (

        <div className="space-y-6">

            {/* ========================= */}
            {/* EN-TÊTE */}
            {/* ========================= */}

            <div>

                <h1 className="text-2xl font-bold text-gray-800">
                    Emprunts intercaisses
                </h1>

                <p className="mt-1 text-gray-500">
                    Consultez les échanges financiers entre les différentes caisses.
                </p>

            </div>


            {/* ========================= */}
            {/* CONTENU */}
            {/* ========================= */}

            {loading && (

                <div className="rounded-lg bg-white p-6 shadow-sm">

                    <p className="text-gray-500">
                        Chargement des emprunts intercaisses...
                    </p>

                </div>

            )}


            {!loading && error && (

                <div className="rounded-lg bg-red-50 p-6">

                    <p className="text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchEmprunts}
                        className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                    >
                        Réessayer
                    </button>

                </div>

            )}


            {!loading && !error && (

                <IntercashLoans
                    emprunts={emprunts}
                />

            )}

        </div>

    );

}