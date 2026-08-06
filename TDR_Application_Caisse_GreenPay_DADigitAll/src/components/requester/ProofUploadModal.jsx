import { useState } from "react";

import {

    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,

    Input,

    Button,

} from "@heroui/react";

import api from "../../services/api";

export default function ProofUploadModal({

    isOpen,

    onClose,

    request,

    onSuccess,

}) {

    const [montant, setMontant] = useState("");

    const [preuve, setPreuve] = useState(null);

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {

        const formData = new FormData();

        formData.append("montant_reel", montant);

        formData.append("preuve", preuve);

        setLoading(true);

        try {

            await api.post(

                `/demandes/${request.id}/preuve`,

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data",

                    },

                }

            );

            onSuccess();

        } catch (error) {

            console.error(error);

        }

        setLoading(false);

    }

    return (

        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
        >

            <ModalContent>

                <ModalHeader>

                    Déposer une preuve

                </ModalHeader>

                <ModalBody>

                    <Input

                        label="Montant réel"

                        type="number"

                        value={montant}

                        onValueChange={setMontant}

                    />

                    <input

                        type="file"

                        accept="image/*"

                        onChange={(e) =>
                            setPreuve(e.target.files[0])
                        }

                    />

                </ModalBody>

                <ModalFooter>

                    <Button
                        variant="light"
                        onPress={onClose}
                    >

                        Annuler

                    </Button>

                    <Button

                        color="primary"

                        isLoading={loading}

                        onPress={handleSubmit}

                    >

                        Envoyer

                    </Button>

                </ModalFooter>

            </ModalContent>

        </Modal>

    );

}