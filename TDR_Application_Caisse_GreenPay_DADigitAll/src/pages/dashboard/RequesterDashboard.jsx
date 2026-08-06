import { useEffect, useState } from "react";
import api from "../../services/api";

import NewRequestButton from "../../components/requester/NewRequestButton";
import NewRequestForm from "../../components/requester/NewRequestForm";
import RequestHistory from "../../components/requester/RequestHistory";
import ProofUploadModal from "../../components/requester/ProofUploadModal";

export default function RequesterDashboard() {

    const [showForm, setShowForm] = useState(false);
    const [requests, setRequests] = useState([]);

    const activeStatuses = [
        "en_attente",
        "acceptee",
        "preuve_envoyee",
    ];

    const hasActiveRequest = requests.some(request =>
        activeStatuses.includes(request.statut)
    );

    async function fetchRequests() {
        try {
            const response = await api.get("/demandes/mes-demandes");
            console.log(response.data);
            setRequests(response.data);
        } catch (error) {
            console.error(error.response?.data || error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    async function addRequest() {
        await fetchRequests();
        setShowForm(false);
    }

    return (
        <div className="max-w-5xl mx-auto">

            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    Mes dépenses
                </h1>

                <p className="text-gray-500">
                    Retrouvez toutes vos demandes.
                </p>
            </div>

            {!hasActiveRequest && !showForm && (
                <NewRequestButton
                    onClick={() => setShowForm(true)}
                />
            )}

            {showForm && (
                <NewRequestForm
                    onClose={() => setShowForm(false)}
                    onAddRequest={addRequest}
                />
            )}

            {hasActiveRequest && !showForm && (
                <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h3 className="font-semibold text-amber-700">
                        Une demande est déjà en cours
                    </h3>

                    <p className="text-sm text-amber-600 mt-2">
                        Vous pourrez créer une nouvelle demande lorsque votre demande actuelle
                        sera terminée ou rejetée.
                    </p>
                </div>
            )}

            <RequestHistory
                requests={requests}
                onProofUploaded={fetchRequests}
            />
        </div>
    );
}