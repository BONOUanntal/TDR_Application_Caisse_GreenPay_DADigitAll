import { useState } from "react";

export default function NewRequestForm({ onClose, onAddRequest }) {

    const [motif, setMotif] = useState("");
    const [montant, setMontant] = useState("");

    function handleSubmit(e) {

        e.preventDefault();

        const newRequest = {
            id: Date.now(),
            motif,
            montant,
            statut: "En attente",
            date: new Date().toLocaleDateString(),
        };

        onAddRequest(newRequest);

    }

    return (

        <div className="bg-white rounded-xl shadow p-6 mb-8">

            <div className="flex justify-between mb-5">

                <h2 className="font-semibold text-xl">

                    Nouvelle demande

                </h2>

                <button onClick={onClose}>
                    ✕
                </button>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <div>

                    <label>
                        Motif
                    </label>

                    <input
                        className="w-full border rounded-lg p-3"
                        value={motif}
                        onChange={(e) => setMotif(e.target.value)}
                    />

                </div>

                <div>

                    <label>
                        Montant estimé
                    </label>

                    <input
                        type="number"
                        className="w-full border rounded-lg p-3"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                    />

                </div>

                <div>

                    <label>
                        Entreprise
                    </label>

                    <input
                        disabled
                        value="GreenPay"
                        className="w-full border rounded-lg p-3 bg-gray-100"
                    />

                </div>

                <button
                    className="bg-blue-600 text-white rounded-lg px-5 py-3 w-full"
                >

                    Soumettre la demande

                </button>

            </form>

        </div>

    );

}