import React from "react";
import { FaDownload } from "react-icons/fa";
import ButtonCard from "../Global/ButtonCard";
import { getDatesArray } from "@/utils/date";
import { toast } from "react-hot-toast";
import { Modal, Button } from "react-daisyui";
import { useRef, useCallback, useEffect } from "react";

const convertJSONtoCSV = (json) => {
    const separator = ";";
    const keys = Object.keys(json[0]);
    const header = keys.join(separator);
    const rows = json.map((row) => {
        return keys
            .map((key) => {
                return row[key];
            })
            .join(separator);
    });
    const csv = [header, ...rows].join("\n");
    return csv;
};

const getChallengeDatas = async (challenge, startDate, endDate) => {
    try {
        const response = await fetch(
            "/api/challenges/" +
                challenge.id +
                "/datas?start_date=" +
                startDate +
                "&end_date=" +
                endDate
        );
        if (!response.ok) {
            throw new Error("Failed to fetch challenge data");
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        toast.error("Une erreur est survenue");
        return [];
    }
};

const ModalDownloadChallengeDatas = ({ challenge }) => {
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const ref = useRef(null);

    const downloadDatas = async (e) => {
        e.preventDefault();
        let startDate = startDateRef.current.value;
        let endDate = endDateRef.current.value;

        // Check if startDate is before endDate
        if (startDate >= endDate) {
            toast.error("La date de début doit être avant la date de fin.");
            return;
        }

        const completeDatas = await getChallengeDatas(
            challenge,
            startDate,
            endDate
        );

        const datesArray = getDatesArray(startDate, endDate);

        let lines = [];
        completeDatas.data.forEach((user) => {
            let line = [];
            line.userIdentifier = user.userIdentifier;
            line.total = user.total;
            line.average = user.average;
            datesArray.forEach((date) => {
                const step = user[date] ? user[date] : 0;
                line[date] = step;
            });
            lines.push(line);
        });
        // Convertir JSON en CSV
        const csv = convertJSONtoCSV(lines);
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "donnees-" + challenge.name + ".csv";
        link.click();
        URL.revokeObjectURL(url);
        ref.current?.close();
        toast.success("Téléchargement des données en cours...");
    };

    useEffect(() => {
        if (challenge) {
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

    useEffect(() => {}, [startDateRef, endDateRef]);

    return (
        <>
            <ButtonCard
                onClick={handleShow}
                icon={<FaDownload size={36} />}
                title="Télécharger les données brutes du challenge"
            />
            <Modal ref={ref} className="">
                <Modal.Header className="font-bold">
                    Télécharger les données en CSV
                </Modal.Header>
                <Modal.Body>
                    <p className="mb-6">
                        Nom du challenge : {challenge.name} <br></br>
                        Dates du challenge :{" "}
                        {new Date(challenge.start_date).toLocaleDateString(
                            "fr-FR"
                        )}{" "}
                        au{" "}
                        {new Date(challenge.end_date).toLocaleDateString(
                            "fr-FR"
                        )}{" "}
                    </p>
                    <form onSubmit={downloadDatas} className="space-y-4">
                        <div className="flex flex-col">
                            <label
                                htmlFor="startDate"
                                className="text-sm font-medium text-gray-700"
                            >
                                Date de début des données
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                min={
                                    new Date(challenge.start_date)
                                        .toISOString()
                                        .split("T")[0]
                                }
                                max={endDateRef.current?.value}
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
                                Date de fin des données
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                min={startDateRef.current?.value}
                                max={
                                    new Date(challenge.end_date)
                                        .toISOString()
                                        .split("T")[0]
                                }
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
                                Télécharger les données
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalDownloadChallengeDatas;
