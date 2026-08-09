export default function RequestHistory({ demandes }) {
    return (
        <div className="space-y-4">

            <div>
                <h2 className="text-xl font-semibold">
                    Historique des demandes
                </h2>

                <p className="text-gray-500">
                    Historique de toutes les demandes des employés.
                </p>
            </div>

            {demandes.length === 0 ? (
                <p className="text-gray-500">
                    Aucune demande enregistrée.
                </p>
            ) : (
                <div className="space-y-3">

                    {demandes.map((demande) => (

                        <div
                            key={demande.id}
                            className="border rounded-xl p-5"
                        >

                            <div className="flex justify-between">

                                <div>
                                    <h3 className="font-semibold">
                                        {demande.user?.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {demande.entreprise?.nom}
                                    </p>

                                    <p className="mt-2">
                                        {demande.motif}
                                    </p>
                                </div>

                                <div className="text-right">

                                    <p className="font-bold">
                                        {Number(
                                            demande.montant_estime
                                        ).toLocaleString("fr-FR")} FCFA
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            demande.created_at
                                        ).toLocaleDateString("fr-FR")}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-4">

                                <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                                    {demande.statut}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}