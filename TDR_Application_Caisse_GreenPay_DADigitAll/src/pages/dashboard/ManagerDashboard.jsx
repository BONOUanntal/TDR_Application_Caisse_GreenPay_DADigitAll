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
import api from "../../services/api";

export default function ManagerDashboard() {

    const location = useLocation();

    const isHistorique =
        location.pathname === "/dashboard/historique";

    const [caisses, setCaisses] = useState([]);
    const [demandes, setDemandes] = useState([]);
    const [preuves, setPreuves] = useState([]);
    const [historique, setHistorique] = useState([]);

    const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);


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

            setCaisses(caissesRes.data);
            setDemandes(demandesRes.data);
            setPreuves(preuvesRes.data);

        } catch (error) {

            console.error(
                "Erreur récupération dashboard :",
                error
            );

        }

    }


    // =====================================================
    // HISTORIQUE
    // =====================================================

    async function fetchHistorique() {

        try {

            const response =
                await api.get("/demandes/historique");

            setHistorique(response.data);

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


    async function handleAccept(id) {

        try {

            await api.post(
                `/demandes/${id}/accepter`
            );

            await fetchDashboard();

        } catch (error) {

            if (error.response?.status === 422) {

                alert(
                    error.response.data?.message ||
                    "Solde insuffisant pour cette opération."
                );

            } else {

                console.error("Erreur :", error);

                alert(
                    "Une erreur est survenue."
                );

            }

        }

    }


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

                </section>


            ) : (

                // ==========================================
                // DASHBOARD PRINCIPAL
                // ==========================================

                <>

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

                </>

            )}

        </div>

    );

}