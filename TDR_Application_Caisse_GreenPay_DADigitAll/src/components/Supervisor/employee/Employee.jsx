import { useEffect, useState } from "react";
import api from "../../../services/api";
import AddRequesterModal from "../../users/AddRequesterModal";

export default function Employee() {

    const [employees, setEmployees] = useState([]);
    const [entreprises, setEntreprises] = useState([]);

    const [entreprise, setEntreprise] = useState("Toutes");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isRequesterModalOpen, setIsRequesterModalOpen] =
        useState(false);


    // =========================
    // CHARGEMENT DES EMPLOYÉS
    // =========================

    async function fetchEmployees() {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/users");

            const users =
                response.data?.users ??
                response.data?.data ??
                [];

            setEmployees(users);

        } catch (error) {

            console.error(
                "Erreur chargement employés :",
                error.response?.data ?? error
            );

            setError(
                "Impossible de charger les employés."
            );

        } finally {

            setLoading(false);

        }

    }


    // =========================
    // CHARGEMENT DES ENTREPRISES
    // =========================

    async function fetchEntreprises() {

        try {

            const response = await api.get("/entreprises");

            const data =
                Array.isArray(response.data)
                    ? response.data
                    : response.data?.data ?? [];

            setEntreprises(data);

        } catch (error) {

            console.error(
                "Erreur chargement entreprises :",
                error.response?.data ?? error
            );

        }

    }


    useEffect(() => {

        fetchEmployees();
        fetchEntreprises();

    }, []);


    // =========================
    // FILTRAGE
    // =========================

    const filteredEmployees =
        employees.filter((employee) => {

            if (entreprise === "Toutes") {
                return true;
            }

            return (
                employee?.entreprise?.nom === entreprise
            );

        });


    // =========================
    // AJOUT EMPLOYÉ
    // =========================

    async function handleEmployeeCreated() {

        setIsRequesterModalOpen(false);

        await fetchEmployees();

    }


    return (

        <div className="space-y-6">

            {/* HEADER */}

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Employés
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Gestion des employés de DA Digit All et Greenpay
                    </p>

                </div>


                <button
                    type="button"
                    onClick={() =>
                        setIsRequesterModalOpen(true)
                    }
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                    + Ajouter un demandeur
                </button>

            </div>


            {/* FILTRE ENTREPRISE */}

            <div className="bg-white rounded-xl shadow p-4">

                <div className="flex items-center gap-4">

                    <label className="font-medium text-gray-700">
                        Entreprise
                    </label>

                    <select
                        value={entreprise}
                        onChange={(e) =>
                            setEntreprise(e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2"
                    >

                        <option value="Toutes">
                            Toutes
                        </option>

                        {entreprises.map((item) => (

                            <option
                                key={item.id}
                                value={item.nom}
                            >
                                {item.nom}
                            </option>

                        ))}

                    </select>

                </div>

            </div>


            {/* ERREUR */}

            {error && (

                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                    {error}
                </div>

            )}


            {/* LOADING */}

            {loading ? (

                <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    Chargement des employés...
                </div>

            ) : (

                <div className="bg-white rounded-xl shadow overflow-hidden">

                    {/* TABLE */}

                    <table className="w-full">

                        <thead className="bg-gray-50">

                            <tr>

                                <th className="text-left px-6 py-4">
                                    Nom
                                </th>

                                <th className="text-left px-6 py-4">
                                    Email
                                </th>

                                <th className="text-left px-6 py-4">
                                    Téléphone
                                </th>

                                <th className="text-left px-6 py-4">
                                    Poste
                                </th>

                                <th className="text-left px-6 py-4">
                                    Entreprise
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredEmployees.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        Aucun employé trouvé.
                                    </td>

                                </tr>

                            ) : (

                                filteredEmployees.map((employee) => (

                                    <tr
                                        key={employee.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {employee.name}
                                        </td>

                                        <td className="px-6 py-4">
                                            {employee.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {employee.telephone_whatsapp ?? "-"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {employee.poste?.nom ?? "-"}
                                        </td>

                                        <td className="px-6 py-4">
                                            {employee.entreprise?.nom ?? "-"}
                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>

            )}


            {/* MODAL AJOUT */}

            <AddRequesterModal

                isOpen={isRequesterModalOpen}

                onClose={() =>
                    setIsRequesterModalOpen(false)
                }

                onSuccess={handleEmployeeCreated}

            />

        </div>

    );

}