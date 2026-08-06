import { useEffect, useState } from "react";

import DashboardHeader from "../../components/manager/dashboard/DashboardHeader";
import StatsCards from "../../components/manager/StatsCards";
import AlertSoldeInsuffisant from "../../components/manager/AlertSoldeInsuffisant";
import PendingRequests from "../../components/manager/requests/PendingRequests";
import QuickActions from "../../components/manager/actions/QuickActions";
import PendingProofs from "../../components/manager/proofs/PendingProofs";
import api from "../../services/api";

export default function ManagerDashboard() {
  const [caisses, setCaisses] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [preuves, setPreuves] = useState([]);

  async function fetchDashboard() {
        console.log("fetchDashboard appelé");

        try {

            const [caissesRes, demandesRes, preuvesRes] = await Promise.all([
                api.get("/caisses"),
                api.get("/demandes/en-attente"),
                api.get("/preuves/en-attente"),
            ]);

            // const caissesRes = await api.get("/caisses");

            console.log(caissesRes.data);

            setCaisses(caissesRes.data);
            setDemandes(demandesRes.data);
            setPreuves(preuvesRes.data);

            console.log("Réponse complète :", caissesRes);
            console.log("Data :", caissesRes.data);
            console.log("Demandes :", demandesRes.data);

        } catch (error) {
            console.error("Erreur API :", error);
        }
    }

    async function handleAccept(id) {
        try {

            await api.post(`/demandes/${id}/accepter`);

            fetchDashboard();

        } catch (error) {
            console.log(error);
            console.log(error.response?.data);
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
                onReject={handleReject}
            />

            <PendingProofs
                preuves={preuves}
                onValidate={handleValidateProof}
                onReject={handleRejectProof}
            />

            <QuickActions />

        </div>

    );

}