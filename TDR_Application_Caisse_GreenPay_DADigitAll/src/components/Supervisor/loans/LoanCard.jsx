import { Chip } from "@heroui/react";

export default function LoanCard({ emprunt }) {

    return (

        <div className="px-6 py-5">

            <div className="flex justify-between items-center">

                <div>

                    <p className="font-semibold">

                        {emprunt.caisse_source.nom}

                    </p>

                    <p className="text-sm text-gray-500">

                        →

                        {" "}

                        {emprunt.caisse_destination.nom}

                    </p>

                </div>

                <Chip
                    color={
                        emprunt.regularise
                            ? "success"
                            : "warning"
                    }
                    variant="flat"
                >
                    {emprunt.regularise
                        ? "Régularisé"
                        : "En cours"}
                </Chip>

            </div>

            <div className="mt-4 flex justify-between">

                <p className="font-bold">

                    {Number(
                        emprunt.montant
                    ).toLocaleString("fr-FR")} FCFA

                </p>

                <p className="text-sm text-gray-500">

                    {new Date(
                        emprunt.created_at
                    ).toLocaleDateString("fr-FR")}

                </p>

            </div>

        </div>

    );

}