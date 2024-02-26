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
        const identifier = identifierRef.current.value;

        const data = {
            identifier,
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
            toast.success("Utilisateur ajouté avec succès !");
            ref.current?.close();
        } catch (error) {
            console.error(error);
            // Handle error
            toast.error(
                "Une erreur s'est produite lors de l'ajout de l'utilisateur."
            );
        }
    };

    return (
        <>
            <Button color="primary" size="sm" onClick={handleShow}>
                <FaPlus className="mr-1" />
                Nouvel utilisateur
            </Button>
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    Créer un nouvel utilisateur
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="identifier"
                                className="text-sm font-medium text-gray-700"
                            >
                                Identifiant :
                            </label>
                            <input
                                type="text"
                                id="identifier"
                                name="identifier"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={identifierRef}
                                required
                            />
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
                                Créer l'utilisateur
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
