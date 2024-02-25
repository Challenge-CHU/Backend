import React from "react";
import { FaDownload } from "react-icons/fa";
import ButtonCard from "../Global/ButtonCard";

const convertJSONtoCSV = (json) => {
    // Modèle de JSON attendu : const json = [ { "key1": "value1", "key2": "value2", "key3": "value3" }, { "key1": "value4", "key2": "value5", "key3": "value6" }, ... ];

    const separator = ";";
    const keys = Object.keys(json[0]);

    // Créer la ligne d'en-tête
    const header = keys.join(separator);

    // Créer les lignes de donnée
    const rows = json.map((row) => {
        return keys
            .map((key) => {
                return row[key];
            })
            .join(separator);
    });

    // Combinez l'en-tête et les lignes de donnée
    const csv = [header, ...rows].join("\n");

    return csv;
};

// Obtenir les données complètes d'un challenge
const getChallengeCompleteDatas = async (challenge) => {
    // try {
    //     // Faire une requête à l'API pour obtenir les données
    //     const response = await fetch("https://api.example.com/challenge-data");

    //     // Vérifier si la requête a réussi
    //     if (!response.ok) {
    //         throw new Error("Failed to fetch challenge data");
    //     }

    //     // Convertir la réponse en JSON
    //     const data = await response.json();

    //     // Retourner les données
    //     return data;
    // } catch (error) {
    //     console.error(error);
    //     toast.error("Une erreur est survenue");
    //     return [];
    // }
    return [
        {
            key1: "value1",
            key2: "value2",
            key3: "value3",
        },
        {
            key1: "value4",
            key2: "value5",
            key3: "value6",
        },
    ];
};

const DownloadChallengeDatas = ({ challenge }) => {
    const downloadDatas = async () => {
        const completeDatas = await getChallengeCompleteDatas(challenge);
        // Convertir JSON en CSV
        const csv = convertJSONtoCSV(completeDatas);

        // Créer une URL Blob à partir du contenu CSV
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        // Créer un lien de téléchargement
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.csv";

        // Déclencher le téléchargement
        link.click();

        // Nettoyer l'URL Blob
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
