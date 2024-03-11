"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus } from "react-icons/fa";
import ButtonCardSmall from "../Global/ButtonCardSmall";
import { Toaster } from "react-hot-toast";

const ModalChallenge = ({ challenge, onSave }) => {
    const ref = useRef(null);
    const nameChallengeRef = useRef(null);
    const descriptionChallengeRef = useRef(null);
    const passwordChallengeRef = useRef(null);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    useEffect(() => {
        if (challenge) {
            nameChallengeRef.current.value = challenge.name;
            descriptionChallengeRef.current.value = challenge.description;
            passwordChallengeRef.current.value = challenge.password;
            startDateRef.current.value = challenge.startDate;
            endDateRef.current.value = challenge.endDate;
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
        const startDate = startDateRef.current.value;
        const endDate = endDateRef.current.value;

        // Check if startDate is before endDate
        if (startDate >= endDate) {
            toast.error("La date de début doit être avant la date de fin.");
            return;
        }

        const data = {
            name,
            password,
            description,
            startDate,
            endDate,
        };
        console.log(data);
        ref.current?.close();

        try {
            let response;
            if (challenge) {
                response = await fetch(`/api/challenges/${challenge.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            } else {
                response = await fetch("/api/challenges", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
            }
            const responseData = await response.json();
            console.log(responseData);
            // Handle success
            toast.success("Challenge ajouté avec succès !");
            ref.current?.close();
            onSave();
        } catch (error) {
            console.error(error);
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
                                htmlFor="name"
                                className="text-sm font-medium text-gray-700"
                            >
                                Nom :
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={nameChallengeRef}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium text-gray-700"
                            >
                                Nom :
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={descriptionChallengeRef}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700"
                            >
                                Mot de passe :
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={passwordChallengeRef}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="startDate"
                                className="text-sm font-medium text-gray-700"
                            >
                                Date de début :
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                ref={startDateRef}
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="endDate"
                                className="text-sm font-medium text-gray-700"
                            >
                                Date de fin :
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
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
