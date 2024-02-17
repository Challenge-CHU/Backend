import React from "react";
import { FaDownload } from "react-icons/fa6";
import ButtonCard from "../Button/ButtonCard";

const getChallengeCompleteDatas = (challenge) => {
    // Get the complete datas of a challenge

    // Get the complete datas of a challenge logic goes here
    return {
        // Complete datas of the challenge
    };
};

const DownloadChallengeDatas = ({ challenge }) => {
    // Component logic goes here
    const completeDatas = getChallengeCompleteDatas(challenge);

    const downloadDatas = (datas) => {
        const downloadJSONasCSV = (json) => {
            // Convert JSON to CSV
            const csv = convertJSONtoCSV(json);

            // Create a Blob URL from the CSV content
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);

            // Create a download link
            const link = document.createElement("a");
            link.href = url;
            link.download = "data.csv";

            // Trigger the download
            link.click();

            // Clean up the Blob URL
            URL.revokeObjectURL(url);
        };

        const convertJSONtoCSV = (json) => {
            // Modèle de JSON attendu : const json = [ { "key1": "value1", "key2": "value2", "key3": "value3" }, { "key1": "value4", "key2": "value5", "key3": "value6" }, // Ajoutez d'autres objets JSON si nécessaire ];

            const separator = ",";
            const keys = Object.keys(json[0]);

            // Create the header row
            const header = keys.join(separator);

            // Create the data rows
            const rows = json.map((row) => {
                return keys
                    .map((key) => {
                        return row[key];
                    })
                    .join(separator);
            });

            // Combine the header and data rows
            const csv = [header, ...rows].join("\n");

            return csv;
        };

        // Usage example
        const json = {
            /* Your JSON data */
        };
        downloadJSONasCSV(json);
    };

    return (
        <ButtonCard
            onClick={() => downloadDatas(completeDatas)}
            icon={<FaDownload size={60} />}
            title="Télécharger les données brutes du challenge"
        />
    );
};

export default DownloadChallengeDatas;
