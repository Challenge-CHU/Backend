import React from "react";
import { FaDownload } from "react-icons/fa";
import ButtonCard from "../Global/ButtonCard";
import { getDatesArray } from "@/utils/date";
import { toast } from "react-hot-toast";

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

const getChallengeCompleteDatas = async (challenge) => {
    try {
        const response = await fetch(
            "/api/challenges/" + challenge.id + "/datas"
        );
        if (!response.ok) {
            throw new Error("Failed to fetch challenge data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        toast.error("Une erreur est survenue");
        return [];
    }
};

const DownloadChallengeDatas = ({ challenge }) => {
    const downloadDatas = async () => {
        const completeDatas = await getChallengeCompleteDatas(challenge);

        const datesArray = getDatesArray(
            challenge.start_date,
            challenge.end_date
        );
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
    };

    return (
        <ButtonCard
            onClick={() => downloadDatas()}
            icon={<FaDownload size={36} />}
            title="Télécharger les données brutes du challenge"
        />
    );
};

export default DownloadChallengeDatas;
