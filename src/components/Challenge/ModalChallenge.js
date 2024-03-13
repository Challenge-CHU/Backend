"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus } from "react-icons/fa";
import ButtonCardSmall from "../Global/ButtonCardSmall";
import { Toaster } from "react-hot-toast";
import { postFetch, putFetch } from "@/utils/fetch";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ModalChallenge = ({ challenge }) => {
    const ref = useRef(null);
    const nameChallengeRef = useRef(null);
    const descriptionChallengeRef = useRef(null);
    const passwordChallengeRef = useRef(null);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    const router = useRouter();

    useEffect(() => {
        if (challenge) {
            nameChallengeRef.current.value = challenge.name;
            descriptionChallengeRef.current.value = challenge.description;
            startDateRef.current.value = new Date(challenge.start_date)
                .toISOString()
                .split("T")[0];
            endDateRef.current.value = new Date(challenge.end_date)
                .toISOString()
                .split("T")[0];
        }
    }, [challenge]);

    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = passwordChallengeRef.current.value;
        const description = descriptionChallengeRef.current.value;
        const name = nameChallengeRef.current.value;
        const start_date = startDateRef.current.value;
        const end_date = endDateRef.current.value;
        // Check if startDate is before endDate
        if (start_date >= end_date) {
            toast.error("La date de début doit être avant la date de fin.");
            return;
        }
        const data = {
            name,
            password,
            description,
            start_date,
            end_date,
        };
        ref.current?.close();
        try {
            let response;
            const session = await getSession();
            const token = session ? session.user.jwt : null;
            if (challenge) {
                response = await putFetch(
                    "/api/challenges/" + challenge.id,
                    data,
                    token
                );
            } else {
                response = await postFetch(`/api/challenges`, data, token);
            }
            const responseData = await response.json();
            if (response.ok) {
                toast.success("Challenge ajouté avec succès !");
            } else {
                toast.error("Une erreur est survenue");
            }
            ref.current?.close();
            router.push("/challenges");
        } catch (error) {
            // Handle error
            toast.error(
                "Une erreur s'est produite lors de l'ajout du challenge."
            );
        }
    };

    return (
        <>
            {challenge ? (
                <ButtonCardSmall
                    onClick={handleShow}
                    icon={<FaEdit size={24} />}
                    title="Modifier le challenge"
                />
            ) : (
                <Button color="primary" size="sm" onClick={handleShow}>
                    <FaPlus className="mr-1" />
                    Nouveau challenge
                </Button>
            )}
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    {challenge
                        ? "Modifier un challenge"
                        : "Créer un nouveau challenge"}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor={`name${challenge?.id}`}
                                className="text-sm font-medium text-gray-700"
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                id={`name${challenge?.id}`}
                                name={`name${challenge?.id}`}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={nameChallengeRef}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor={`description${challenge?.id}`}
                                className="text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <input
                                type="text"
                                id={`description${challenge?.id}`}
                                name={`description${challenge?.id}`}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={descriptionChallengeRef}
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label
                                htmlFor={`password${challenge?.id}`}
                                className="text-sm font-medium text-gray-700"
                            >
                                Mot de passe
                            </label>
                            {challenge && (
                                <p className="text-xs">
                                    Vous n'êtes pas obligé de modifier le mot de
                                    passe du challenge
                                </p>
                            )}
                            {challenge ? (
                                <input
                                    type="test"
                                    id={`password${challenge?.id}`}
                                    name={`password${challenge?.id}`}
                                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={passwordChallengeRef}
                                />
                            ) : (
                                <input
                                    type="test"
                                    id={`password${challenge?.id}`}
                                    name={`password${challenge?.id}`}
                                    className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    ref={passwordChallengeRef}
                                    required
                                />
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor={`startDate${challenge?.id}`}
                                className="text-sm font-medium text-gray-700"
                            >
                                Date de début
                            </label>
                            <input
                                type="date"
                                id={`startDate${challenge?.id}`}
                                name={`startDate${challenge?.id}`}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={startDateRef}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor={`endDate${challenge?.id}`}
                                className="text-sm font-medium text-gray-700"
                            >
                                Date de fin
                            </label>
                            <input
                                type="date"
                                id={`endDate${challenge?.id}`}
                                name={`endDate${challenge?.id}`}
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={endDateRef}
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
                                {challenge
                                    ? "Modifier le challenge"
                                    : "Créer le challenge"}
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Actions></Modal.Actions>
            </Modal>
        </>
    );
};

export default ModalChallenge;
