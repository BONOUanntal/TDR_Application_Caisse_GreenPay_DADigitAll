export default function PendingRequests({
    demandes,
    onValidate,
    onReject,
}) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
                Demandes en attente
            </h2>

            {demandes.length === 0 ? (
                <p>Aucune demande en attente.</p>
            ) : (
                <div className="space-y-4">

                    {demandes.map((demande) => (

                        <div
                            key={demande.id}
                            className="border rounded-xl p-5 flex justify-between items-center"
                        >

                            <div>

                                <div className="flex items-center gap-2">

                                    <h3 className="font-semibold">
                                        {demande.user.name}
                                    </h3>

                                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                        {demande.entreprise.nom}
                                    </span>

                                </div>

                                <p className="mt-2">
                                    {demande.motif}
                                </p>

                            </div>

                            <div className="text-right">

                                <p className="font-bold text-lg mb-3">
                                    {Number(demande.montant_estime).toLocaleString("fr-FR")} FCFA
                                </p>

                                <div className="flex gap-2 justify-end">

                                    <button
                                        onClick={() => onValidate(demande.id)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Valider
                                    </button>

                                    <button
                                        onClick={() => onReject(demande.id)}
                                        className="border border-red-500 text-red-500 px-4 py-2 rounded-lg"
                                    >
                                        Rejeter
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}
        </div>
    );
}