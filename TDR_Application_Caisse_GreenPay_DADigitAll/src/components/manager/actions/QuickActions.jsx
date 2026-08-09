import { Button } from "@heroui/react";

export default function QuickActions({ onBorrow }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">
                Actions rapides
            </h2>

            <div className="flex gap-4">
                <Button
                    color="primary"
                    onPress={onBorrow}
                >
                    Approvisionner une caisse
                </Button>

                <Button color="secondary">
                    Voir toutes les caisses
                </Button>
            </div>
        </div>
    );
}