"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { deleteFetch } from "@/utils/fetch";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ModalDelete = ({ id }) => {
    const ref = useRef(null);
    const router = useRouter();

    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleDelete = async () => {
        try {
            const session = await getSession();
            const token = session ? session.user.jwt : null;
            const response = await deleteFetch("/api/users/" + id, token);

            const responseData = await response.json();
            // Handle success
            toast.success("Utilisateur supprimé avec succès !");
            ref.current?.close();
            router.refresh();
        } catch (error) {
            console.error(error);
            // Handle error
            toast.error(
                "Une erreur s'est produite lors de la suppression de l'utilisateur."
            );
        }
    };

    return (
        <>
            <Button
                className="btn-error btn-xs text-white cursor-pointer active:opacity-50"
                onClick={handleShow}
            >
                <FaTrash /> Supprimer
            </Button>
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    Supprimer l'utilisateur
                </Modal.Header>
                <Modal.Body>
                    Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                </Modal.Body>
                <Modal.Actions>
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        color="error"
                        onClick={() => ref.current?.close()}
                    >
                        Annuler
                    </Button>
                    <Button size="sm" color="primary" onClick={handleDelete}>
                        Confirmer
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default ModalDelete;
