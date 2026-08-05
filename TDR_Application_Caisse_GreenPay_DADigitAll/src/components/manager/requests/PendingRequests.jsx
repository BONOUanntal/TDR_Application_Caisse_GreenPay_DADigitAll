export default function PendingRequests({ demandes }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
                Demandes en attente
            </h2>

            {demandes.length === 0 ? (
                <p className="text-gray-500">
                    Aucune demande en attente.
                </p>
            ) : (
                <div className="space-y-3">
                    {demandes.map((demande) => (
                        <div
                            key={demande.id}
                            className="border rounded-lg p-4"
                        >
                            <h3 className="font-semibold">
                                {demande.user.name}
                            </h3>

                            <p>{demande.motif}</p>

                            <p className="font-bold">
                                {Number(demande.montant_estime).toLocaleString("fr-FR")} FCFA
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}