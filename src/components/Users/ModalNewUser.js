"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";

const ModalNewUser = () => {
    const ref = useRef(null);
    const identifierRef = useRef(null);

    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const identifiers = identifierRef.current.value
            .split(",")
            .map((identifier) => identifier.trim());

        const data = {
            identifiers,
        };
        console.log(data);
        ref.current?.close();

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            console.log(responseData);
            // Handle success
            toast.success("Utilisateurs ajoutés avec succès !");
            ref.current?.close();
        } catch (error) {
            console.error(error);
            // Handle error
            toast.error(
                "Une erreur s'est produite lors de l'ajout des utilisateurs."
            );
        }
    };

    return (
        <>
            <Button color="primary" size="sm" onClick={handleShow}>
                <FaPlus className="mr-1" />
                Nouveaux utilisateurs
            </Button>
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    Créer de nouveaux utilisateurs
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="identifiers"
                                className="text-sm font-medium text-gray-700"
                            >
                                Identifiants (séparés par une virgule) :
                            </label>
                            <textarea
                                aria-label="identifiers"
                                id="identifiers"
                                name="identifiers"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={identifierRef}
                                required
                                rows={10}
                            ></textarea>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                color="error"
                                onClick={() => ref.current?.close()}
                            >
                                Annuler
                            </Button>
                            <Button size="sm" color="primary" type="submit">
                                Créer les utilisateurs
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Actions></Modal.Actions>
            </Modal>
        </>
    );
};

export default ModalNewUser;
