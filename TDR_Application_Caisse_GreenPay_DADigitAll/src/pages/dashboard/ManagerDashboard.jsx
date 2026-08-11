import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardHeader from "../../components/manager/dashboard/DashboardHeader";
import StatsCards from "../../components/manager/StatsCards";
import AlertSoldeInsuffisant from "../../components/manager/AlertSoldeInsuffisant";
import PendingRequests from "../../components/manager/requests/PendingRequests";
import HistorySection from "../../components/manager/history/HistorySection";
import QuickActions from "../../components/manager/actions/QuickActions";
import PendingProofs from "../../components/manager/proofs/PendingProofs";
import BorrowModal from "../../components/manager/loans/BorrowModal";
import AddRequesterModal from "../../components/users/AddRequesterModal";
import AddCaisseModal from "../../components/manager/caisses/AddCaisseModal";
import ChooseCaisseModal from "../../components/manager/requests/ChooseCaisseModal";
import api from "../../services/api";

export default function ManagerDashboard() {

    const location = useLocation();

    const isHistorique =
        location.pathname === "/dashboard/historique";

    const [caisses, setCaisses] = useState([]);
    const [demandes, setDemandes] = useState([]);
    const [preuves, setPreuves] = useState([]);
    const [historique, setHistorique] = useState([]);
    const [historiquePage, setHistoriquePage] = useState(1);

    const [historiquePagination, setHistoriquePagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
    });

    const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
    const [isRequesterModalOpen, setIsRequesterModalOpen] = useState(false);
    const [isCaisseModalOpen, setIsCaisseModalOpen] = useState(false);
    const [isCaisseChoiceModalOpen, setIsCaisseChoiceModalOpen] = useState(false);
    const [selectedDemande, setSelectedDemande] = useState(null);


    // =====================================================
    // CHARGEMENT DES DONNÉES
    // =====================================================

    useEffect(() => {

        if (isHistorique) {
            fetchHistorique();
        } else {
            fetchDashboard();
        }

    }, [isHistorique]);


    // =====================================================
    // DASHBOARD PRINCIPAL
    // =====================================================

    async function fetchDashboard() {
        console.log("fetchDashboard appelé");

        try {
            const [
                caissesRes,
                demandesRes,
                preuvesRes,
            ] = await Promise.all([
                api.get("/caisses"),
                api.get("/demandes/en-attente"),
                api.get("/preuves/en-attente"),
            ]);

            console.log("Réponse demandes :", demandesRes.data);
            console.log(
                "Demandes est un tableau ?",
                Array.isArray(demandesRes.data)
            );

            setCaisses(
                Array.isArray(caissesRes.data)
                    ? caissesRes.data
                    : caissesRes.data.data ?? []
            );

            setDemandes(
                Array.isArray(demandesRes.data)
                    ? demandesRes.data
                    : demandesRes.data.data ?? []
            );

            setPreuves(
                Array.isArray(preuvesRes.data)
                    ? preuvesRes.data
                    : preuvesRes.data.data ?? []
            );

        } catch (error) {
            console.error("Erreur API :", error);
        }
    }


    // =====================================================
    // HISTORIQUE
    // =====================================================

    async function fetchHistorique(page = 1) {

        try {

            const response = await api.get(
                `/demandes/historique?page=${page}`
            );

            console.log(
                "Historique pagination :",
                response.data
            );

            setHistorique(
                Array.isArray(response.data)
                    ? response.data
                    : response.data.data ?? []
            );

            setHistoriquePagination({
                current_page:
                    response.data.current_page ?? 1,

                last_page:
                    response.data.last_page ?? 1,

                per_page:
                    response.data.per_page ?? 10,

                total:
                    response.data.total ?? 0,
            });

            setHistoriquePage(
                response.data.current_page ?? 1
            );

        } catch (error) {

            console.error(
                "Erreur récupération historique :",
                error
            );

        }
    }


    // =====================================================
    // DEMANDES
    // =====================================================

    async function handleValidateWithoutProof(id) {

        try {

            await api.post(
                `/demandes/${id}/valider-sans-preuve`
            );

            await fetchDashboard();

        } catch (error) {

            console.error(error);
            console.error(error.response?.data);

        }

    }

    function handleAccept(id) {
        const demande = demandes.find((d) => d.id === id);
        if (!demande) return;

        setSelectedDemande(demande);
        setIsCaisseChoiceModalOpen(true);
    }

    async function handleConfirmAccept(id, caisseId) {

        try {

            await api.post(
                `/demandes/${id}/accepter`,
                { caisse_id: caisseId }
            );

            await fetchDashboard();

            setIsCaisseChoiceModalOpen(false);
            setSelectedDemande(null);

        } catch (error) {

            if (error.response?.status === 422) {

                alert(
                    error.response.data?.message ||
                    "Solde insuffisant pour cette opération."
                );

            } else {

                console.error("Erreur :", error);
                alert("Une erreur est survenue.");

            }

            throw error; // pour que le loading de la modal s'arrête proprement

        }

    }


    // async function handleAccept(id) {

    //     try {

    //         await api.post(
    //             `/demandes/${id}/accepter`
    //         );

    //         await fetchDashboard();

    //     } catch (error) {

    //         if (error.response?.status === 422) {

    //             alert(
    //                 error.response.data?.message ||
    //                 "Solde insuffisant pour cette opération."
    //             );

    //         } else {

    //             console.error("Erreur :", error);

    //             alert(
    //                 "Une erreur est survenue."
    //             );

    //         }

    //     }

    // }


    async function handleReject(id) {

        try {

            await api.post(
                `/demandes/${id}/rejeter`
            );

            await fetchDashboard();

        } catch (error) {

            console.error(error);

        }

    }


    // =====================================================
    // PREUVES
    // =====================================================

    async function handleValidateProof(id) {

        try {

            await api.post(
                `/preuves/${id}/valider`
            );

            await fetchDashboard();

        } catch (error) {

            console.error(error);

        }

    }


    async function handleRejectProof(id) {

        try {

            await api.post(
                `/preuves/${id}/rejeter`
            );

            await fetchDashboard();

        } catch (error) {

            console.error(error);

        }

    }


    // =====================================================
    // EMPRUNT
    // =====================================================

    async function handleBorrow(data) {

        try {

            await api.post(
                "/emprunts",
                data
            );

            await fetchDashboard();

            alert(
                "Emprunt enregistré avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur emprunt :",
                error
            );

            console.error(
                error.response?.data
            );

            throw error;

        }

    }


    // =====================================================
    // AFFICHAGE
    // =====================================================

    return (

        <div className="space-y-6">

            <DashboardHeader />


            {isHistorique ? (

                // ==========================================
                // PAGE HISTORIQUE
                // ==========================================

                <section className="space-y-6">

                    <div>

                        <h1 className="text-2xl font-semibold">
                            Historique des demandes
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Consultez les demandes précédemment
                            effectuées par les employés.
                        </p>

                    </div>


                    <HistorySection
                        demandes={historique}
                    />

                    {historiquePagination.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">

                            <button
                                onClick={() =>
                                    fetchHistorique(historiquePage - 1)
                                }
                                disabled={historiquePage === 1}
                                className="px-4 py-2 border rounded-lg
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        hover:bg-gray-50"
                            >
                                Précédent
                            </button>

                            {Array.from(
                                {
                                    length: historiquePagination.last_page,
                                },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() =>
                                        fetchHistorique(page)
                                    }
                                    className={`px-4 py-2 rounded-lg ${
                                        historiquePage === page
                                            ? "bg-blue-600 text-white"
                                            : "border hover:bg-gray-100"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    fetchHistorique(historiquePage + 1)
                                }
                                disabled={
                                    historiquePage ===
                                    historiquePagination.last_page
                                }
                                className="px-4 py-2 border rounded-lg
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        hover:bg-gray-50"
                            >
                                Suivant
                            </button>

                        </div>
                    )}

                </section>


            ) : (

                // ==========================================
                // DASHBOARD PRINCIPAL
                // ==========================================

                <>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => setIsCaisseModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            + Ajouter une caisse
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsRequesterModalOpen(true)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        >
                            + Ajouter un demandeur
                        </button>

                    </div>


                    <StatsCards
                        caisses={caisses}
                    />


                    <AlertSoldeInsuffisant />


                    <PendingRequests
                        demandes={demandes}
                        onAccept={handleAccept}
                        onValidateWithoutProof={
                            handleValidateWithoutProof
                        }
                        onReject={handleReject}
                    />


                    <PendingProofs
                        preuves={preuves}
                        onValidate={handleValidateProof}
                        onReject={handleRejectProof}
                    />


                    <QuickActions
                        onBorrow={() =>
                            setIsBorrowModalOpen(true)
                        }
                    />


                    <BorrowModal
                        isOpen={isBorrowModalOpen}
                        onClose={() =>
                            setIsBorrowModalOpen(false)
                        }
                        caisses={caisses}
                        onSuccess={handleBorrow}
                    />

                    <AddRequesterModal
                        isOpen={isRequesterModalOpen}
                        onClose={() =>
                            setIsRequesterModalOpen(false)
                        }
                    />

                    <AddCaisseModal
                        isOpen={isCaisseModalOpen}
                        onClose={() =>
                            setIsCaisseModalOpen(false)
                        }
                        onSuccess={async () => {
                            await fetchDashboard();
                            setIsCaisseModalOpen(false);
                        }}
                    />

                    <ChooseCaisseModal
                        isOpen={isCaisseChoiceModalOpen}
                        onClose={() => {
                            setIsCaisseChoiceModalOpen(false);
                            setSelectedDemande(null);
                        }}
                        demande={selectedDemande}
                        caisses={caisses}
                        onConfirm={handleConfirmAccept}
                    />

                </>

            )}

        </div>

    );

}