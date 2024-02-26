import ModalChallenge from "@/components/Challenge/ModalChallenge";
import Challenge from "@/components/Challenge/Challenge";

export const metadata = {
    title: "Challenges",
    description: "Liste et gestion des challenges",
};

function getChallenges() {
    return [
        {
            id: 1,
            name: "Challenge 1",
            startDate: "2023-02-01",
            endDate: "2023-05-05",
        },
        {
            id: 2,
            name: "Challenge 2",
            startDate: "2024-02-01",
            endDate: "2024-05-05",
        },
        {
            id: 3,
            name: "Challenge 3",
            startDate: "2025-02-01",
            endDate: "2025-05-05",
        },
    ];
}

export default function Challenges() {
    const challenges = getChallenges();

    return (
        <>
            <div className="page-header flex justify-between items-center mb-10 ">
                <h1 className="text-3xl font-bold">Challenges</h1>
                <ModalChallenge />
            </div>

            <Challenge challenges={challenges} />
        </>
    );
}
