import { useState } from "react";

import NewRequestButton from "../../components/requester/NewRequestButton";
import NewRequestForm from "../../components/requester/NewRequestForm";
import RequestHistory from "../../components/requester/RequestHistory";

import { mockRequests } from "../../data/mockRequests";

export default function RequesterDashboard() {

    const [showForm, setShowForm] = useState(false);

    // Toutes les demandes sont stockées ici
    const [requests, setRequests] = useState(mockRequests);

    function addRequest(newRequest) {

        setRequests([
            newRequest,
            ...requests,
        ]);

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

            <RequestHistory
                requests={requests}
            />

        </div>

    );

}