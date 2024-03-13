"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa6";
import { putFetch } from "@/utils/fetch";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ModalEditUser = ({ user }) => {
    const ref = useRef(null);
    const pseudoRef = useRef(null);
    const router = useRouter();

    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pseudo = pseudoRef.current.value;

        const data = {
            pseudo,
        };
        ref.current?.close();

        try {
            const session = await getSession();
            const token = session ? session.user.jwt : null;
            const response = await putFetch(
                `/api/users/${user.id}`,
                data,
                token
            );

            const responseData = await response.json();
            // Handle success
            toast.success("Utilisateur modifié avec succès !");
            ref.current?.close();
            router.push("/utilisateurs");
        } catch (error) {
            console.error(error);
            // Handle error
            toast.error(
                "Une erreur s'est produite lors de la modification de l'utilisateur."
            );
        }
    };

    return (
        <>
            <Button
                className="btn-outline btn-secondary btn-xs text-white cursor-pointer active:opacity-50"
                onClick={handleShow}
            >
                <FaPen /> Modifier
            </Button>
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    Modifier un utilisateur
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="pseudo"
                                className="text-sm font-medium text-gray-700"
                            >
                                Pseudo :
                            </label>
                            <input
                                type="text"
                                id={"pseudo" + user.id}
                                name="pseudo"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={pseudoRef}
                                defaultValue={user.pseudo}
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
                                Modifier l'utilisateur
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Actions></Modal.Actions>
            </Modal>
        </>
    );
};

export default ModalEditUser;
