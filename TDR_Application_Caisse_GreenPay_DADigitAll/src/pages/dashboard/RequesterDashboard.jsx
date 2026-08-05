import { useEffect, useState } from "react";
import api from "../../services/api";

import NewRequestButton from "../../components/requester/NewRequestButton";
import NewRequestForm from "../../components/requester/NewRequestForm";
import RequestHistory from "../../components/requester/RequestHistory";

export default function RequesterDashboard() {

    const [showForm, setShowForm] = useState(false);
    const [requests, setRequests] = useState([]);

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

            {!showForm ? (
                <NewRequestButton
                    onClick={() => setShowForm(true)}
                />
            ) : (
                <NewRequestForm
                    onClose={() => setShowForm(false)}
                    onAddRequest={addRequest}
                />
            )}

            <RequestHistory requests={requests} />

        </div>
    );
}