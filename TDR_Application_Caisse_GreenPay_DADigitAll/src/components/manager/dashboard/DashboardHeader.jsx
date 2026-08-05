import { Button } from "@heroui/react";

export default function DashboardHeader() {
    return (
        <div className="flex items-center justify-between">

            <div>
                <h1 className="text-3xl font-bold">
                    Tableau de bord
                </h1>

                <p className="text-gray-500 mt-1">
                    Gérez les caisses et les demandes de dépenses.
                </p>
            </div>

            <Button color="primary">
                Actualiser
            </Button>

        </div>
    );
}