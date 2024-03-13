"use client";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Papa from "papaparse";

const ModalImportUser = () => {
    const ref = useRef(null);
    const [csvFile, setCsvFile] = useState(null);
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [values, setValues] = useState([]);

    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        ref.current?.close();
        Papa.parse(csvFile, {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });
                setParsedData(results.data);
                setTableRows(rowsArray[0]);
                setValues(valuesArray);
            },
        });
        const users = JSON.stringify(values.flat());

        if (tableRows.length !== 1 || tableRows[0] !== "identifiant") {
            toast.error(
                "Erreur : Le fichier CSV doit contenir une seule colonne avec le nom 'identifiant'."
            );
            return;
        }

        try {
            const response = await fetch("/api/users/multiple", {
                method: "POST",
                body: users,
            });
            const responseData = await response.json();

            let numberOfUsers = users.length;
            if (responseData.data.count === 0) {
                toast.error(
                    "Aucun utilisateur n'a été ajouté car ils existent déjà."
                );
                return;
            } else if (numberOfUsers !== responseData.data.count) {
                toast.success(
                    numberOfUsers -
                        responseData.data.count +
                        " sur " +
                        numberOfUsers +
                        " utilisateurs existent déjà. Les autres ont été ajoutés avec succès !"
                );
                return;
            } else {
                toast.success("Utilisateurs ajoutés avec succès !");
            }
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
            <Button
                color="secondary"
                variant="outline"
                size="sm"
                onClick={handleShow}
            >
                <FaPlus className="mr-1" />
                Import CSV
            </Button>
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    Créer de nouveaux utilisateurs
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="csvFile"
                                className="text-sm font-medium text-gray-700"
                            >
                                Fichier CSV :
                            </label>
                            <input
                                type="file"
                                id="csvFile"
                                name="csvFile"
                                accept=".csv"
                                className="file-input w-full  my-4"
                                required
                                onChange={(e) => setCsvFile(e.target.files[0])}
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

export default ModalImportUser;
