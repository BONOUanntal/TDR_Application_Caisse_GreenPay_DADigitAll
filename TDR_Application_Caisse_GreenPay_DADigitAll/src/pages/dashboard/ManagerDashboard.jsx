import { useEffect, useState } from "react";

import DashboardHeader from "../../components/manager/dashboard/DashboardHeader";
import StatsCards from "../../components/manager/StatsCards";
import AlertSoldeInsuffisant from "../../components/manager/AlertSoldeInsuffisant";
import PendingRequests from "../../components/manager/requests/PendingRequests";
import RequestHistory from "../../components/manager/requests/RequestHistory";
import QuickActions from "../../components/manager/actions/QuickActions";
import PendingProofs from "../../components/manager/proofs/PendingProofs";
import BorrowModal from "../../components/manager/loans/BorrowModal";
import api from "../../services/api";

export default function ManagerDashboard() {
  const [caisses, setCaisses] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [preuves, setPreuves] = useState([]);
  const [historique, setHistorique] = useState([]);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);

  async function fetchDashboard() {
        console.log("fetchDashboard appelé");

        try {

            const [caissesRes, demandesRes, preuvesRes, historiqueRes] = await Promise.all([
                api.get("/caisses"),
                api.get("/demandes/en-attente"),
                api.get("/preuves/en-attente"),
                api.get("/demandes/historique"),
            ]);

            // const caissesRes = await api.get("/caisses");

            console.log(caissesRes.data);

            setCaisses(caissesRes.data);
            setDemandes(demandesRes.data);
            setPreuves(preuvesRes.data);
            setHistorique(historiqueRes.data);

            console.log("Réponse complète :", caissesRes);
            console.log("Data :", caissesRes.data);
            console.log("Demandes :", demandesRes.data);

        } catch (error) {
            console.error("Erreur API :", error);
        }
    }

    async function handleValidateWithoutProof(id) {
        try {

            await api.post(`/demandes/${id}/valider-sans-preuve`);

            fetchDashboard();

        } catch (error) {

            console.error(error);
            console.error(error.response?.data);

        }
    }

    async function handleAccept(id) {
        try {
            await api.post(`/demandes/${id}/accepter`);

            await fetchDashboard();

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
        }
    }

    async function handleReject(id) {
        try {

            await api.post(`/demandes/${id}/rejeter`);

            fetchDashboard();

        } catch (error) {

            console.error(error);

        }
    }

    async function handleValidateProof(id) {
        try {
            await api.post(`/preuves/${id}/valider`);
            fetchDashboard();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleRejectProof(id) {
        try {
            await api.post(`/preuves/${id}/rejeter`);
            fetchDashboard();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleBorrow(data) {
        try {
            await api.post("/emprunts", data);

            await fetchDashboard();

            alert("Emprunt enregistré avec succès.");

        } catch (error) {
            console.error("Erreur emprunt :", error);
            console.error(error.response?.data);

            throw error;
        }
    }

  useEffect(()=>{
    fetchDashboard();
  },[]);

    return (

        <div className="space-y-6">

            <DashboardHeader />

            <StatsCards caisses={caisses} />

            <AlertSoldeInsuffisant />

            <PendingRequests
                demandes={demandes}
                onAccept={handleAccept}
                onValidateWithoutProof={handleValidateWithoutProof}
                onReject={handleReject}
            />

            <PendingProofs
                preuves={preuves}
                onValidate={handleValidateProof}
                onReject={handleRejectProof}
            />

            <RequestHistory demandes={historique} />

            <QuickActions
                onBorrow={() => setIsBorrowModalOpen(true)}
            />

            <BorrowModal
                isOpen={isBorrowModalOpen}
                onClose={() => setIsBorrowModalOpen(false)}
                caisses={caisses}
                onSuccess={handleBorrow}
            />

        </div>

    );

}